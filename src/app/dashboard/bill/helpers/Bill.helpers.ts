import {
	Bill,
	BillItem,
	CurrencyType,
	DolarValue,
	initialValuesBill,
} from "@/types";

const calculateTotals = (
	bill: Bill,
	dolar: DolarValue = { value: 0, date: new Date() }
): Bill => {
	const { items } = bill;

	const USD = items.reduce((total: number, item: BillItem) => {
		const { cost, currencyType, quantity } = item;

		let toSum = cost * quantity;

		if (currencyType == CurrencyType.BSF) toSum = toSum / dolar.value;

		console.log(toSum);

		return total + toSum;
	}, 0);

	return {
		...bill,
		dolarValue: dolar,
		totals: { USD, BSF: USD * dolar.value },
	};
};

export const updateBillItem = (
	bill: Bill | null,
	billItem: BillItem,
	dolar: DolarValue | null
): Bill => {
	const currentBill = bill || initialValuesBill;
	const dolarValue = dolar || { value: 0, date: new Date() };

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
		dolarValue
	);

	return newBillWithTotals;
};

export const deleteItemInBill = (
	bill: Bill | null,
	productId: string
): Bill => {
	const currentBill = bill || initialValuesBill;

	const { items } = currentBill;

	currentBill.items = items.filter((item) => item.productId != productId);

	return calculateTotals(currentBill);
};

export const clearBill = (): Bill => {
	return initialValuesBill;
};
