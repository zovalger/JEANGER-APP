import { Bill, ForeignExchange } from "@/types";

export const initialValuesProductReferenceManipulate = {
	toAdd: [],
	current: [],
	toDelete: [],
	editing: null,
	posibleParents: [],
};

export const initialValuesForeignExchange: ForeignExchange = {
	dolar: 0,
	euro: 0,
	date: new Date(),
};

export const initialValuesBill: Bill = {
	_id: "",
	date: new Date(),
	items: [],
	totals: { BSF: 0, USD: 0 },
	foreignExchange: initialValuesForeignExchange,
};
