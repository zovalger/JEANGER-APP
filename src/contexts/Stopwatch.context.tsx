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

interface ContextProps {
	stopwatches: Stopwatch[];
	setStopwatches: Dispatch<SetStateAction<Stopwatch[]>>;
}

interface productsIndexed {
	[productId: string]: Stopwatch;
}

const StopwatchContext = createContext<ContextProps>({
	stopwatches: [],
	setStopwatches: (): Stopwatch[] => [],
});

export const StopwatchContextProvider = ({ children }: propsWithChildren) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [stopwatches, setStopwatches] = useState<Stopwatch[]>([]);

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

		const soc = io(`${PROXY}`);

		setSocket(soc);
		setListeners(soc);

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
		<StopwatchContext.Provider value={{ stopwatches, setStopwatches }}>
			{children}
		</StopwatchContext.Provider>
	);
};

export const useStopwatchContext = () => useContext(StopwatchContext);
