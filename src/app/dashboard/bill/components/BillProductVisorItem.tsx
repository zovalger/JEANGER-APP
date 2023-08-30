import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box } from "@mui/material";
import { useProductContext } from "../../products/context/Product.context";
import { BillItem, CurrencyType } from "@/types";
import { Card, Grid, Typography } from "@mui/material";
import { useGlobalContext } from "@/contexts/Global.context";

interface props {
	data: BillItem;
}

export default function BillProductVisorItem({ data }: props) {
	const { dolar } = useGlobalContext();
	const { productsIndexed } = useProductContext();

	const { quantity } = data;
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
				px: "1rem",
				py: 1,
				":hover": { bgcolor: "#0001" },
			}}
		>
			<Grid container spacing={2} alignItems={"center"}>
				<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
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
			</Grid>
			{/* </CardContent> */}
		</Card>
	);
}
