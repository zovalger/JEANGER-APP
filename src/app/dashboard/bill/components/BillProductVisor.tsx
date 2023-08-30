import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";
import { useBillContext } from "../context/Bill.context";
import { useProductContext } from "../../products/context/Product.context";
import BillProductVisorItem from "./BillProductVisorItem";

interface props {}

export default function BillProductVisor({}: props) {
	const { currentBill } = useBillContext();

	useEffect(() => {
		return () => {};
	}, []);

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box>
			{currentBill &&
				currentBill.items.map((item) => (
					<BillProductVisorItem key={uuid()} data={item} />
				))}
		</Box>
	);
}
