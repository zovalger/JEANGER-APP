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
import {
	addBillToList,
	deleteOneBillFromList,
} from "../helpers/BillList.helpers";
import { getAllBillsRequest } from "@/api/Bill.api";

interface ContextProps {
	bills: Bill[];

	setBills: Dispatch<SetStateAction<Bill[]>>;

	currentBill: Bill | null;
	setCurrentBill: Dispatch<SetStateAction<Bill | null>>;

	sendBillBroadcast(data: Bill): void;
	sendDeleteBillBroadcast(_id: string): void;
}

const BillContext = createContext<ContextProps>({
	bills: [],
	setBills: (): Bill[] => [],

	currentBill: null,
	setCurrentBill: (): Bill | null => null,

	sendBillBroadcast: (data: Bill) => {},
	sendDeleteBillBroadcast: (_id: string) => {},
});

export const BillContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los billos
	const [socket, setSocket] = useState<Socket | null>(null);

	const [bills, setBills] = useState<Bill[]>([]);
	const [currentBill, setCurrentBill] = useState<Bill | null>(null);

	useEffect(() => {
		getAllBillsRequest()
			.then(setBills)
			.catch((err) => console.log(err));
	}, []);

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

	const sendDeleteBillBroadcast = (_id: string) => {
		if (!socket) return;
		socket.emit(BillEvents.delete, _id);
	};

	const reciveBill = ({ data, oldId }: { data: Bill; oldId: string }) => {
		setBills((prev) => addBillToList(deleteOneBillFromList(prev, oldId), data));
	};

	const reciveDeleteBill = (_id: string) => {
		setBills((prev) => deleteOneBillFromList(prev, _id));
	};

	const setListeners = async (socket: Socket) => {
		socket.on(BillEvents.send, reciveBill);
		socket.on(BillEvents.delete, reciveDeleteBill);
	};

	return (
		<BillContext.Provider
			value={{
				bills,
				setBills,

				currentBill,
				setCurrentBill,

				sendBillBroadcast,
				sendDeleteBillBroadcast,
			}}
		>
			{children}
		</BillContext.Provider>
	);
};

export const useBillContext = () => useContext(BillContext);
