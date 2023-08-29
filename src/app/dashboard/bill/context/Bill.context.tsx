"use client";

import { Bill, propsWithChildren } from "@/types";

import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";

interface ContextProps {
	bills: Bill[];

	setBills: Dispatch<SetStateAction<Bill[]>>;

	currentBill: Bill | null;
	setCurrentBill: Dispatch<SetStateAction<Bill | null>>;
}

const BillContext = createContext<ContextProps>({
	bills: [],
	setBills: (): Bill[] => [],

	currentBill: null,
	setCurrentBill: (): Bill | null => null,
});

export const BillContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los billos
	const [bills, setBills] = useState<Bill[]>([]);
	const [currentBill, setCurrentBill] = useState<Bill | null>(null);

	useEffect(() => {
		// refreshBills();
	}, []);

	// const refreshBills = async () => {
	// 	try {
	// 		const p = await getAllBillsRequest();
	// 		const keywords = getAllKeywordsBills(p);

	// 		console.log(keywords);
	// 		setAllKeywords(keywords);

	// 		setDataAndIndexate(p);
	// 	} catch (error) {}
	// };

	return (
		<BillContext.Provider
			value={{
				bills,
				setBills,

				currentBill,
				setCurrentBill,
			}}
		>
			{children}
		</BillContext.Provider>
	);
};

export const useBillContext = () => useContext(BillContext);
