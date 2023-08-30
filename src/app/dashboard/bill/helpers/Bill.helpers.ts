import { Bill, BillItem } from "@/types";
import BillProductVisor from "../components/BillProductVisor";

export const updateBillItem = (bill: Bill | null, billItem: BillItem): Bill => {
	const currentBill = bill || { items: [], total: 0 };

	let newItems: BillItem[] = currentBill.items;

	const oldBillItem = currentBill.items.find(
		(item) => item.productId == billItem.productId
	);

	const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

	const newQuantity = oldQuantity + billItem.quantity;

	// todo: anadirlo

	if (!oldBillItem && newQuantity > 0) {
		console.log("anadir");
		newItems = [...currentBill.items, billItem];
		return { items: newItems };
	}

	if (!oldBillItem) return currentBill;

	// todo quitarlo
	if (newQuantity <= 0) {
		console.log("eliminar");

		newItems = currentBill.items.filter(
			(item) => item.productId != billItem.productId
		);

		return { items: newItems };
	}

	// todo actualizarlo
	console.log("actualizar");
	newItems = newItems.map((item) =>
		item.productId == billItem.productId
			? { ...item, quantity: newQuantity }
			: item
	);

	return { items: newItems };
};
