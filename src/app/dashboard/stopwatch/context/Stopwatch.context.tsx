"use client";

import { io, Socket } from "socket.io-client";

import dynamic from "next/dynamic";

const ReactHowler = dynamic(() => import("react-howler"), { ssr: false });

import { Stopwatch, propsWithChildren } from "@/types";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";

import { PROXY } from "@/config";
import { StopwatchEvents } from "@/config/SocketEventsSystem";
import { getAllStopwatchRequest } from "@/api/Stopwatch.api";
import { useNotistackContext } from "@/contexts/Notistack.context";

interface ContextProps {
	stopwatches: Stopwatch[];
	setStopwatches: Dispatch<SetStateAction<Stopwatch[]>>;

	stopwatchData: Stopwatch | null;
	setStopwatchData: Dispatch<SetStateAction<Stopwatch | null>>;

	sendCreateStopwatch(data: Stopwatch): void;
	sendUpdateStopwatch(data: Stopwatch): void;
	sendDeleteStopwatch(_id: string): void;

	referenceTime: number;
}

const StopwatchContext = createContext<ContextProps>({
	stopwatches: [],
	setStopwatches: (): Stopwatch[] => [],
	stopwatchData: null,
	setStopwatchData: (): Stopwatch | null => null,

	sendCreateStopwatch: (data: Stopwatch): void => {},
	sendUpdateStopwatch: (data: Stopwatch): void => {},
	sendDeleteStopwatch: (_id: string): void => {},

	referenceTime: Date.now(),
});

export const StopwatchContextProvider = ({ children }: propsWithChildren) => {
	const { Notification } = useNotistackContext();

	const [socket, setSocket] = useState<Socket | null>(null);

	const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

	const [stopwatchData, setStopwatchData] = useState<Stopwatch | null>(null);

	const [referenceTime, setReferenceTime] = useState(Date.now());

	const [soundAlarmPlay, setSoundAlarmPlay] = useState(false);

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		setInterval(() => {
			const time = Date.now();

			setReferenceTime(time);
		}, 1000);
	}, []);

	useEffect(() => {
		const pasados = stopwatches.filter(
			(item) =>
				item.timeSeted !== null &&
				item.timeDate &&
				item.timeDate < referenceTime
		);

		console.log(pasados);

		if (pasados.length) {
			if (!soundAlarmPlay)
				Notification("info", `Termino el tiempo de ${pasados[0].name}`);

			setSoundAlarmPlay(true);
		} else {
			setSoundAlarmPlay(false);
		}
	}, [referenceTime]);

	useEffect(() => {
		getAllStopwatchRequest()
			.then((data) => setStopwatches(data))
			.catch((error) => console.log(error));
	}, []);

	// ****************************************************************************
	// 										          Funciones de gestion
	// ****************************************************************************

	const updateStopwatch = (data: Stopwatch) => {
		{
			return setStopwatches((prev) => {
				let arr = [];
				const swIndex = prev.findIndex((item) => item._id === data._id);

				if (swIndex < 0) arr = [...prev, data];
				else arr = prev.map((item) => (item._id === data._id ? data : item));

				return arr;
			});
		}
	};

	const deleteStopwatch = (_id: string) =>
		setStopwatches((prev) => prev.filter((item) => item._id !== _id));

	// ****************************************************************************
	// 										          socket Funciones
	// ****************************************************************************

	const setListeners = async (socket: Socket) => {
		socket.on(StopwatchEvents.sendUpdate, updateStopwatch);
		socket.on(StopwatchEvents.delete, deleteStopwatch);
	};

	useEffect(() => {
		if (socket) return;

		try {
			const soc = io(`${PROXY}`);

			setSocket(soc);
			setListeners(soc);
		} catch (error) {
			console.log(error);
		}
		// return () => {
		// 	second;
		// };
	}, [socket]);

	const sendCreateStopwatch = (data: Omit<Stopwatch, "_id">) => {
		if (!socket) return;

		socket.emit(StopwatchEvents.create, data);
	};

	const sendUpdateStopwatch = (data: Stopwatch) => {
		// todo: enviar datos
		updateStopwatch(data);

		if (!socket) return;

		socket.emit(StopwatchEvents.sendUpdate, data);
	};

	const sendDeleteStopwatch = (_id: string) => {
		// todo: enviar datos

		if (!socket) return;

		socket.emit(StopwatchEvents.delete, _id);
	};

	return (
		<StopwatchContext.Provider
			value={{
				stopwatches,
				setStopwatches,
				sendCreateStopwatch,
				sendUpdateStopwatch,
				sendDeleteStopwatch,

				stopwatchData,
				setStopwatchData,

				referenceTime,
			}}
		>
			{isClient && (
				<ReactHowler
					src="/sounds/ringtone-126505.mp3"
					playing={soundAlarmPlay}
					volume={0.6}
				/>
			)}
			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
