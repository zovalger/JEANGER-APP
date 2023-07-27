"use client";
import { io, Socket } from "socket.io-client";

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
import { log } from "console";

interface ContextProps {
	stopwatches: Stopwatch[];
	setStopwatches: Dispatch<SetStateAction<Stopwatch[]>>;

	sendCreateStopwatch(data: Stopwatch): void;
	sendUpdateStopwatch(data: Stopwatch): void;
	sendDeleteStopwatch(_id: string): void;
}

const StopwatchContext = createContext<ContextProps>({
	stopwatches: [
		{
			_id: "1",
			name: "pc 1",
			timeDate: null,
			accumulatedTime: 20,
			timeSeted: 360,
		},
	],
	setStopwatches: (): Stopwatch[] => [],
	sendCreateStopwatch: (data: Stopwatch): void => {},
	sendUpdateStopwatch: (data: Stopwatch): void => {},
	sendDeleteStopwatch: (_id: string): void => {},
});

export const StopwatchContextProvider = ({ children }: propsWithChildren) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const [stopwatches, setStopwatches] = useState<Stopwatch[]>([
		{
			_id: "1",
			name: "pc 1",
			timeDate: null,
			accumulatedTime: 0,
			timeSeted: 0,
		},
		{
			_id: "2",
			name: "pc 2",
			timeDate: null,
			accumulatedTime: 0,
			timeSeted: 0,
		},
	]);

	useEffect(() => {
		getAllStopwatchRequest()
			.then((data) => setStopwatches(data))
			.catch((error) => console.log(error));
	}, []);

	// ****************************************************************************
	// 										          Funciones de gestion
	// ****************************************************************************

	const updateStopwatch = (data: Stopwatch) => {
		const swIndex = stopwatches.findIndex((item) => item._id === data._id);

		if (swIndex < 0) return setStopwatches([...stopwatches, data]);

		const newStopwatch = stopwatches.map((item) =>
			item._id === data._id ? data : item
		);

		setStopwatches(newStopwatch);
	};

	const deleteStopwatch = (_id: string) =>
		setStopwatches(stopwatches.filter((item) => item._id !== _id));

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
			}}
		>
			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
