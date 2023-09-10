import { useEffect } from "react";

import { Box } from "@mui/material";
import BillProductItem from "./BillProductItem";

interface props {
	productIdList: string[];
	selected: number;
	addProductToBill(idex: number): void;
}

export default function BillProductSelector({
	productIdList,
	selected,
	addProductToBill,
}: props) {
	useEffect(() => {
		return () => {};
	}, []);

	const showLimitedProducts = (arr: string[]) => {
		const limited = arr.slice(0, 15);

		return limited.map((_id, index) => (
			<BillProductItem
				key={_id}
				_id={_id}
				onClick={() => {
					addProductToBill(index);
				}}
				index={index}
				selected={selected}
			/>
		));
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box sx={{ position: "relative", zIndex: 1 }}>
			{productIdList.length > 0 && (
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
					boxShadow={8}
				>
					{showLimitedProducts(productIdList)}
				</Box>
			)}
		</Box>
	);
}
