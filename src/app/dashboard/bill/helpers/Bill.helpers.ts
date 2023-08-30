import { Bill, BillItem } from "@/types";
import BillProductVisor from "../components/BillProductVisor";

export const updateBillItem = (bill: Bill | null, billItem: BillItem): Bill => {
	const currentBill = bill || { items: [], total: 0 };

	let newItems = [];

	const oldBillItem = currentBill.items.find(
		(item) => item.productId == billItem.productId
	);

	const oldQuantity = oldBillItem ? oldBillItem.quantity : 0;

	const newQuantity = oldQuantity + billItem.quantity;

	if (!oldBillItem && newQuantity > 0) {
		newItems = [...currentBill.items, billItem];
		return { items: newItems };
	}

	if (!oldBillItem) return currentBill;



		if (newQuantity <= 0) {
			// todo quitarlo
			newBill.items = newBill.items.filter(
				(item) => item.productId != billItem.productId
			);
		} else {
			newBill.items = [
				...newBill.items,
				{ ...billItem, quantity: newQuantity },
			];
		}

	console.log(newBill.items);

	return newBill;
};
