import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

import { Box, IconButton } from "@mui/material";
import { useProductContext } from "../../products/context/Product.context";
import { BillItem, CurrencyType } from "@/types";
import { Card, Grid, Typography } from "@mui/material";
import { useGlobalContext } from "@/contexts/Global.context";
import { useBillContext } from "../context/Bill.context";
import { deleteItemInBill } from "../helpers/Bill.helpers";

interface props {
	data: BillItem;
}

export default function BillProductVisorItem({ data }: props) {
	const { currentBill, setCurrentBill } = useBillContext();
	const { dolar } = useGlobalContext();
	const { productsIndexed } = useProductContext();

	const { quantity, productId } = data;
	const { name, cost, currencyType } = productsIndexed[data.productId];

	useEffect(() => {
		return () => {};
	}, []);

	let d = dolar || { value: 0 };

	const BSF = currencyType == CurrencyType.BSF ? cost : cost * d.value;
	const USD = currencyType == CurrencyType.USD ? cost : cost / d.value;

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Card
			variant="outlined"
			// onClick={onClick}
			sx={{
				mb: "0.2rem",
				pl: "1rem",
				py: 1,
				":hover": { bgcolor: "#0001" },
			}}
		>
			<Grid container spacing={2} alignItems={"center"}>
				<Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
					<Typography
						component={"span"}
						textAlign={"center"}
						sx={{ mr: "1rem" }}
					>
						{quantity}
					</Typography>
					<Typography component={"span"}>{name}</Typography>
				</Grid>

				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<Box textAlign={"right"}>
						<Typography component={"span"}>{BSF.toFixed(2)}</Typography>
						<Typography component={"span"} sx={{ ml: 1 }}>
							{CurrencyType.BSF}
						</Typography>
					</Box>
					<Box textAlign={"right"}>
						<Typography component={"span"}>{USD.toFixed(2)}</Typography>
						<Typography component={"span"} sx={{ ml: 1 }} color={"#0a6f"}>
							{CurrencyType.USD}
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<Box textAlign={"right"}>
						<Typography component={"span"}>
							{(BSF * quantity).toFixed(2)}
						</Typography>
						<Typography component={"span"} sx={{ ml: 1 }}>
							{CurrencyType.BSF}
						</Typography>
					</Box>
					<Box textAlign={"right"}>
						<Typography component={"span"}>
							{(USD * quantity).toFixed(2)}
						</Typography>
						<Typography component={"span"} sx={{ ml: 1 }} color={"#0a6f"}>
							{CurrencyType.USD}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						// edge="start"
						onClick={async () => {
							setCurrentBill(deleteItemInBill(currentBill, productId));
						}}
						// sx={{ mr: 2}}
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
			{/* </CardContent> */}
		</Card>
	);
}