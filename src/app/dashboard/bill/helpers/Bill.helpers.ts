import { Bill, BillItem, DolarValue } from "@/types";

const initialValuesBill = {
	items: [],
	totals: { BSF: 0, USD: 0 },
	dolarValue: { value: 0, date: new Date() },
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

	if (!oldBillItem && newQuantity > 0)
		newItems = [...currentBill.items, billItem];

	if (!oldBillItem) return currentBill;

	// todo quitarlo
	if (newQuantity <= 0)
		newItems = currentBill.items.filter(
			(item) => item.productId != billItem.productId
		);

	// todo actualizarlo
	if (newQuantity > 0)
		newItems = newItems.map((item) =>
			item.productId == billItem.productId
				? { ...item, quantity: newQuantity }
				: item
		);

	const newBillWithTotals = calculateTotals(
		{
			...currentBill,
			items: newItems,
		},
		dolarValue
	);

	return newBillWithTotals;
};

const calculateTotals = (
	bill: Bill,
	dolar: DolarValue = { value: 0, date: new Date() }
): Bill => {
	return bill;
};
