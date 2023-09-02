import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box, Grid, Typography } from "@mui/material";
import { useBillContext } from "../context/Bill.context";
import { useProductContext } from "../../products/context/Product.context";
import BillProductVisorItem from "./BillProductVisorItem";
import { CurrencyType, initialValuesBill } from "@/types";
import {
	getOnlyFavoriteProduct,
	sortProductByPriority,
} from "../../products/helpers/Product.helpers";

interface props {}

export default function BillProductVisor({}: props) {
	const { products } = useProductContext();
	const { currentBill, setCurrentBill } = useBillContext();

	const { totals, items } = currentBill || initialValuesBill;

	const sortByPriority = sortProductByPriority(products);

	const productsFavorites = getOnlyFavoriteProduct(sortByPriority);

	const productsBillItemsFavoritesByPriority = productsFavorites.map((prod) => {
		const { _id, currencyType, cost } = prod;

		const billItem = items.find((item) => item.productId === _id);

		return billItem || { productId: _id, quantity: 0, currencyType, cost };
	});

	const remainingBillItem = items.filter(
		(prod) =>
			!productsBillItemsFavoritesByPriority.some(
				(item) => item.productId === prod.productId
			)
	);
	// getOnlyFavoriteProduct

	useEffect(() => {
		return () => {};
	}, []);

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box>
			{/* // todo: que no se desordenen al agregarlos a la factura  */}
			{productsBillItemsFavoritesByPriority.map((data) => (
				<BillProductVisorItem key={uuid()} data={data} />
			))}

			{currentBill &&
				remainingBillItem.map((item) => (
					<BillProductVisorItem key={uuid()} data={item} />
				))}

			<Grid
				sx={{ my: ".5rem" }}
				container
				spacing={2}
				alignItems={"center"}
				justifyContent={"right"}
			>
				<Grid item xs={6} sm={3}>
					<Box sx={{ display: "flex" }}>
						<Box>
							<Typography
								component={"span"}
								textAlign={"center"}
								sx={{ mr: "1rem", fontSize: "1.2rem" }}
							>
								SubTotal
							</Typography>
						</Box>

						<Box sx={{ ml: "auto" }}>
							<Typography
								textAlign={"center"}
								sx={{ mr: "1rem", fontSize: "1.2rem" }}
							>
								{(totals.BSF * (1 / 1.16)).toFixed(2)} {CurrencyType.BSF}
							</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex" }}>
						<Box>
							<Typography
								component={"span"}
								textAlign={"center"}
								sx={{ mr: "1rem", fontSize: "1.2rem" }}
							>
								iva 16%
							</Typography>
						</Box>

						<Box sx={{ ml: "auto" }}>
							<Typography
								textAlign={"center"}
								sx={{ mr: "1rem", fontSize: "1.2rem" }}
							>
								{(totals.BSF - totals.BSF * (1 / 1.16)).toFixed(2)}{" "}
								{CurrencyType.BSF}
							</Typography>
						</Box>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
						<Box>
							<Typography
								component={"span"}
								textAlign={"center"}
								sx={{ mr: "1rem", fontSize: "1.3rem" }}
							>
								Total
							</Typography>
						</Box>

						<Box sx={{ ml: "auto", fontSize: "1.3rem" }}>
							<Typography textAlign={"center"} sx={{ mr: "1rem" }} variant="h6">
								{totals.BSF.toFixed(2)} {CurrencyType.BSF}
							</Typography>
							<Typography textAlign={"center"} sx={{ mr: "1rem" }} variant="h6">
								{totals.USD.toFixed(2)} {CurrencyType.USD}
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
