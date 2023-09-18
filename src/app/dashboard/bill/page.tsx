"use client";

import BillAdder from "./components/BillAdder";
import PageTemplate from "@/app/components/PageTemplate";
import BillListVisor from "./components/BillListVisor";
import { useBillContext } from "./context/Bill.context";

export default function BillPage() {
	const { currentBill } = useBillContext();

	const textNav = `Facturas ${
		currentBill ? (currentBill.name ? `(${currentBill.name})` : "") : ""
	}`;

	return (
		<PageTemplate nameNavBar={textNav}>
			<BillAdder />
			<BillListVisor />
		</PageTemplate>
	);
}
