import {
	Bill,
	BillItem,
	CurrencyType,
	ForeignExchange,
	initialValuesBill,
	initialValuesForeignExchange,
} from "@/types";

const calculateTotals = (
	bill: Bill,
	foreignExchange: ForeignExchange = initialValuesForeignExchange
): Bill => {
	const { items } = bill;

	const USD = items.reduce((total: number, item: BillItem) => {
		const { cost, currencyType, quantity } = item;

		let toSum = cost * quantity;

		if (currencyType == CurrencyType.BSF) toSum = toSum / foreignExchange.dolar;

		return total + toSum;
	}, 0);

	return {
		...bill,
		foreignExchange,
		totals: { USD, BSF: USD * foreignExchange.dolar },
	};
};

// todo: comentar paso
export const updateBillItem = (
	bill: Bill | null,
	billItem: BillItem,
	foreignExchange: ForeignExchange | null
): Bill => {
	const currentBill = bill || initialValuesBill;
	const foreignExchangeCurrent =
		foreignExchange || initialValuesForeignExchange;

	let newItems: BillItem[] = currentBill.items;

	const oldBillItem = currentBill.items.find(
		(item) => item.productId == billItem.productId
	);

	const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

	const newQuantity = oldQuantity + billItem.quantity;

	// todo: anadirlo

	if (!oldBillItem && newQuantity > 0) {
		console.log("anadirlo");

		newItems = [...newItems, billItem];
	} else if (!oldBillItem) return currentBill;

	// todo quitarlo
	if (newQuantity <= 0) {
		console.log("quitar");

		newItems = newItems.filter((item) => item.productId != billItem.productId);
	}

	// todo actualizarlo
	if (newQuantity > 0) {
		console.log("actualizar");

		newItems = newItems.map((item) =>
			item.productId == billItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);
	}

	const newBillWithTotals = calculateTotals(
		{
			...currentBill,
			items: newItems,
		},
		foreignExchangeCurrent
	);

	return newBillWithTotals;
};

// todo: comentar paso
export const setOneBillItem = (
	bill: Bill | null,
	billItem: BillItem,
	foreignExchange: ForeignExchange | null
): Bill => {
	const currentBill = bill || initialValuesBill;
	const foreignExchangeCurrent =
		foreignExchange || initialValuesForeignExchange;

	let newItems: BillItem[] = currentBill.items;

	const oldBillItem = currentBill.items.find(
		(item) => item.productId == billItem.productId
	);

	const newQuantity = billItem.quantity;

	// todo: anadirlo

	if (!oldBillItem && newQuantity > 0) {
		console.log("anadirlo");

		newItems = [...newItems, billItem];
	} else if (!oldBillItem) return currentBill;

	// todo actualizarlo
	if (newQuantity > 0) {
		console.log("actualizar");

		newItems = newItems.map((item) =>
			item.productId == billItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);
	}

	const newBillWithTotals = calculateTotals(
		{
			...currentBill,
			items: newItems,
		},
		foreignExchangeCurrent
	);

	return newBillWithTotals;
};

export const deleteItemInBill = (
	bill: Bill | null,
	foreignExchange: ForeignExchange | null,
	productId: string
): Bill => {
	const currentBill = bill || initialValuesBill;

	const { items } = currentBill;

	currentBill.items = items.filter((item) => item.productId != productId);

	return calculateTotals(currentBill, foreignExchange || undefined);
};

export const clearBill = (): Bill => {
	return initialValuesBill;
};
