"use client";

import BillAdder from "./components/BillAdder";
import PageTemplate from "@/app/components/PageTemplate";

export default function BillPage() {
	return (
		<PageTemplate nameNavBar="Facturas">
			<BillAdder />
		</PageTemplate>
	);
}
