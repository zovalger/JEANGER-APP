import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Card, Grid, Typography } from "@mui/material";

import { useProductContext } from "../../products/context/Product.context";
import { useGlobalContext } from "@/contexts/Global.context";
import { useBillContext } from "../context/Bill.context";
import { deleteItemInBill } from "../helpers/Bill.helpers";
import BillProductVisorItemModalForm from "./BillProductVisorItemModalForm";
import { BillItem } from "@/types";
import { initialValuesForeignExchange } from "@/config/initialValues";
import { CurrencyType } from "@/enums";

interface props {
	data: BillItem;
	onDeleteItem?(productId: string): void;
}

export default function BillProductVisorItem({ data, onDeleteItem }: props) {
	const { currentBill, setCurrentBill } = useBillContext();
	const { foreignExchange } = useGlobalContext();
	const { productsIndexed } = useProductContext();

	const { quantity, productId } = data;
	const { name, cost, currencyType } = productsIndexed[data.productId];

	const [openModal, setOpenModal] = useState(false);

	const handdleOpenModal = () => {
		setOpenModal(true);
	};
	const handdleCloseModal = () => {
		setOpenModal(false);
	};

	const handdleDelete = async () => {
		if (onDeleteItem) onDeleteItem(productId);
		setCurrentBill(deleteItemInBill(currentBill, foreignExchange, productId));
	};

	useEffect(() => {
		return () => {};
	}, []);

	let d = foreignExchange || initialValuesForeignExchange;

	const divisaRef = currencyType == CurrencyType.USD ? d.dolar : d.euro;
	const BSF = currencyType == CurrencyType.BSF ? cost : cost * divisaRef;

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Card
			variant="outlined"
			onClick={() => {
				handdleOpenModal();
			}}
			sx={{
				mb: "0.2rem",
				pl: "1rem",
				":hover": { bgcolor: "#0001" },
			}}
		>
			<Grid container columnSpacing={2} alignItems={"center"}>
				<Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
					<Typography
						component={"span"}
						textAlign={"center"}
						sx={{ mr: "1rem" }}
					>
						{quantity}
					</Typography>
					<Typography component={"span"}>{name}</Typography>
				</Grid>

				<Grid item xs={6} sm={6} md={2} lg={2} xl={2}>
					<Box textAlign={"right"}>
						<Typography component={"span"}>
							{BSF.toFixed(2)} {CurrencyType.BSF}
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
					<Box textAlign={"right"}>
						<Typography component={"span"}>
							{(BSF * quantity).toFixed(2)} {CurrencyType.BSF}
						</Typography>
					</Box>
				</Grid>

				<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
					<IconButton
						color="inherit"
						// aria-label="open drawer"
						edge="end"
						onClick={() => {
							handdleDelete();
						}}
						sx={{ zIndex: 0 }}
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>

			{openModal && (
				<BillProductVisorItemModalForm
					data={data}
					onClose={handdleCloseModal}
				/>
			)}
		</Card>
	);
}
