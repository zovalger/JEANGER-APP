"use client";

import BillAdder from "./components/BillAdder";
import PageTemplate from "@/app/components/PageTemplate";
import BillListVisor from "./components/BillListVisor";

export default function BillPage() {
	return (
		<PageTemplate nameNavBar="Facturas">
			<BillAdder />
			<BillListVisor />
		</PageTemplate>
	);
}
