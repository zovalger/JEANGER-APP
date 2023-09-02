import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box, Grid, Typography } from "@mui/material";
import { useBillContext } from "../context/Bill.context";
import { useProductContext } from "../../products/context/Product.context";
import BillProductVisorItem from "./BillProductVisorItem";
import { CurrencyType, initialValuesBill } from "@/types";
import { getOnlyFavoriteProduct } from "../../products/helpers/Product.helpers";

interface props {}

export default function BillProductVisor({}: props) {
	const { currentBill, setCurrentBill } = useBillContext();
	const { products } = useProductContext();

	const { totals, items } = currentBill || initialValuesBill;

	const productsFavorites = getOnlyFavoriteProduct(products).filter(
		(prod) => !items.some((item) => item.productId === prod._id)
	);

	useEffect(() => {
		return () => {};
	}, []);

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box>
			{/* // todo: que no se desordenen al agregarlos a la factura  */}
			{productsFavorites.map(({ _id, currencyType, cost }) => (
				<BillProductVisorItem
					key={uuid()}
					data={{ productId: _id, quantity: 0, currencyType, cost }}
				/>
			))}
			{currentBill &&
				items.map((item) => <BillProductVisorItem key={uuid()} data={item} />)}
			<Grid
				container
				spacing={2}
				alignItems={"center"}
				justifyContent={"right"}
			>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<Typography
						component={"span"}
						textAlign={"center"}
						sx={{ mr: "1rem" }}
						variant="h5"
					>
						Total
					</Typography>
				</Grid>
				<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
					<Typography textAlign={"center"} sx={{ mr: "1rem" }} variant="h6">
						{totals.USD.toFixed(2)} {CurrencyType.USD}
					</Typography>
					<Typography textAlign={"center"} sx={{ mr: "1rem" }} variant="h6">
						{totals.BSF.toFixed(2)} {CurrencyType.BSF}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
