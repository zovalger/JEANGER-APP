import { initialValuesBill } from "@/config/initialValues";
import { Bill } from "@/types";

export const addBillToList = (billList: Bill[], bill: Bill | null): Bill[] => {

	if (!bill)  return billList;
	
	if (!bill.items.length) return billList;

	return [...billList, bill];
};

export const getOneBillAndRemove = (
	billList: Bill[],
	billId: string
): [Bill, Bill[]] => {
	const selectedBill = billList.find((bill) => bill._id === billId);

	if (!selectedBill) return [initialValuesBill, billList];

	const newBillList = billList.filter((bill) => bill._id != billId);

	return [selectedBill, newBillList];
};

export const deleteOneBillFromList = (
	billList: Bill[],
	billId: string
): Bill[] => billList.filter((item) => item._id != billId);
