import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";
import { useBillContext } from "../context/Bill.context";
import { useProductContext } from "../../products/context/Product.context";

interface props {}

export default function BillProductVisor({}: props) {
	const { currentBill } = useBillContext();
	const { productsIndexed } = useProductContext();

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
					<Box key={uuid()}>
						{/* <Box>{item.productId}</Box> */}
						<Box>{item.quantity}</Box>
						<Box>{productsIndexed[item.productId].name}</Box>
						<Box>{productsIndexed[item.productId].cost}</Box>
						<Box>{productsIndexed[item.productId].cost * item.quantity}</Box>
					</Box>
				))}
		</Box>
	);
}
