import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import BillProductItem from "./BillProductItem";

interface props {
	productIdList: string[];
	selected: number;
}

export default function BillProductSelector({
	productIdList,
	selected,
}: props) {
	useEffect(() => {
		return () => {};
	}, []);

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box>
			{productIdList.map((_id, index) => (
				<BillProductItem
					key={_id}
					_id={_id}
					onClick={() => {}}
					index={index}
					selected={selected}
				/>
			))}
		</Box>
	);
}
