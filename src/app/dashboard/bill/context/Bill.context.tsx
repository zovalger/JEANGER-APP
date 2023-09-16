"use client";

import { PROXY } from "@/config";
import { BillEvents } from "@/config/SocketEventsSystem";
import { Bill, propsWithChildren } from "@/types";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { Socket, io } from "socket.io-client";
import { addBillToList } from "../helpers/BillList.helpers";

interface ContextProps {
	bills: Bill[];

	setBills: Dispatch<SetStateAction<Bill[]>>;

	currentBill: Bill | null;
	setCurrentBill: Dispatch<SetStateAction<Bill | null>>;

	sendBillBroadcast(data: Bill): void;
}

const BillContext = createContext<ContextProps>({
	bills: [],
	setBills: (): Bill[] => [],

	currentBill: null,
	setCurrentBill: (): Bill | null => null,

	sendBillBroadcast: (data: Bill) => {},
});

export const BillContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los billos
	const [socket, setSocket] = useState<Socket | null>(null);

	const [bills, setBills] = useState<Bill[]>([]);
	const [currentBill, setCurrentBill] = useState<Bill | null>(null);

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

	const sendBillBroadcast = (data: Bill) => {
		if (!socket) return;
		socket.emit(BillEvents.send, data);
	};

	const reciveBill = (data: Bill) => {
		setBills((prev) => addBillToList(prev, data));
	};

	const setListeners = async (socket: Socket) => {
		socket.on(BillEvents.send, reciveBill);
	};

	return (
		<BillContext.Provider
			value={{
				bills,
				setBills,

				currentBill,
				setCurrentBill,

				sendBillBroadcast,
			}}
		>
			{children}
		</BillContext.Provider>
	);
};

export const useBillContext = () => useContext(BillContext);
