import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Box, Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ShareIcon from "@mui/icons-material/Share";

import { useBillContext } from "../context/Bill.context";
import { useProductContext } from "../../products/context/Product.context";
import BillProductVisorItem from "./BillProductVisorItem";
import {
	getOnlyFavoriteProduct,
	sortProductByPriority,
} from "../../products/helpers/Product.helpers";
import { clearBill } from "../helpers/Bill.helpers";
import { addBillToList } from "../helpers/BillList.helpers";
import { initialValuesBill } from "@/config/initialValues";
import { CurrencyType } from "@/enums";
import BillListVisorModalForm from "./BillListVisorModalForm";

interface props {}

export default function BillProductVisor({}: props) {
	const { products } = useProductContext();
	const { currentBill, setCurrentBill, bills, setBills, sendBillBroadcast } =
		useBillContext();
	const [deletedFavorites, setDeletedFavorites] = useState<string[]>([]);

	const { totals, items } = currentBill || initialValuesBill;

	const sortByPriority = sortProductByPriority(products);

	const productsFavorites = getOnlyFavoriteProduct(sortByPriority);

	const productsBillItemsFavoritesByPriority = productsFavorites
		.map((prod) => {
			const { _id, currencyType, cost } = prod;

			const billItem = items.find((item) => item.productId === _id);

			return billItem || { productId: _id, quantity: 0, currencyType, cost };
		})
		.filter((item) => !deletedFavorites.includes(item.productId));

	const remainingBillItem = items.filter(
		(prod) =>
			!productsBillItemsFavoritesByPriority.some(
				(item) => item.productId === prod.productId
			)
	);

	useEffect(() => {
		if (!currentBill) return;

		const toRemoveFromDeleted = deletedFavorites.filter((id) =>
			currentBill.items.some((item) => item.productId == id)
		);

		setDeletedFavorites((prev) =>
			prev.filter((_id) => !toRemoveFromDeleted.includes(_id))
		);

		return () => {};
	}, [currentBill]);

	// *******************************************************************
	// 													Functions
	// *******************************************************************

	const [submiting, setSubmiting] = useState(false);

	const openModal = () => {
		if (!currentBill || !currentBill.items.length) return;
		setSubmiting(true);
	};

	const closeModal = () => {
		setSubmiting(false);
	};

	const onDelete = async () => {
		setDeletedFavorites([]);
		setCurrentBill(clearBill());
	};

	// *******************************************************************
	// 													items
	// *******************************************************************

	const onDeleteItem = (productId: string) => {
		// todo: añadir al array de favoritos eliminados
		if (deletedFavorites.includes(productId)) return;
		setDeletedFavorites((prev) => [...prev, productId]);
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<>
			{submiting && <BillListVisorModalForm onClose={closeModal} />}

			<Box>
				{/* // todo: que no se desordenen al agregarlos a la factura  */}
				{productsBillItemsFavoritesByPriority.map((data) => (
					<BillProductVisorItem
						key={uuid()}
						data={data}
						onDeleteItem={onDeleteItem}
					/>
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
					<Grid item order={{ xs: 3, sm: 0 }} xs={12} sm={5}>
						<Box sx={{ display: "flex", justifyContent: "space-between" }}>
							<Button
								color="error"
								variant="outlined"
								aria-label="open drawer"
								onClick={onDelete}
							>
								<DeleteIcon />
							</Button>

							<Button
								color="primary"
								variant="outlined"
								aria-label="open drawer"
								tabIndex={-1}
								onClick={(e) => {
									// e.target
									console.log("click");

									openModal();
								}}
							>
								<AddIcon />
							</Button>
						</Box>
					</Grid>
					<Grid item xs={11} sm={7} md={5} lg={4}>
						<Box sx={{ display: "flex" }}>
							<Box>
								<Typography
									component={"span"}
									textAlign={"center"}
									sx={{ mr: "1rem", fontSize: "1rem" }}
								>
									SubTotal
								</Typography>
							</Box>

							<Box sx={{ ml: "auto" }}>
								<Typography
									textAlign={"center"}
									sx={{ mr: "1rem", fontSize: "1rem" }}
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
									sx={{ mr: "1rem", fontSize: "1rem" }}
								>
									iva 16%
								</Typography>
							</Box>

							<Box sx={{ ml: "auto" }}>
								<Typography
									textAlign={"center"}
									sx={{ mr: "1rem", fontSize: "1rem" }}
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
								<Typography
									textAlign={"center"}
									sx={{ mr: "1rem" }}
									variant="h6"
								>
									{totals.USD.toFixed(2)} {CurrencyType.USD}
								</Typography>
								<Typography
									textAlign={"center"}
									sx={{ mr: "1rem" }}
									variant="h6"
								>
									{totals.BSF.toFixed(2)} {CurrencyType.BSF}
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
