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
		<Box sx={{ position: "relative" }}>
			<Box
				sx={{
					position: "absolute",
					left: 0,
					right: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mx: "2rem",

					background: "#fff",
					borderRadius: "8px",
				}}
				boxShadow={2}
			>
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
		</Box>
	);
}
