"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

import { BillItem } from "@/types";
import { useBillContext } from "../context/Bill.context";
import { updateBillItem } from "../helpers/Bill.helpers";
import { useGlobalContext } from "@/contexts/Global.context";

// *****************************************************************************
// 											form de referencias
// *****************************************************************************

interface Props {
	data: BillItem;
	onClose(): void;

	// onSubmit(formData: ProductReference): void;
	// onDelete(formData: ProductReference): void;
}

export default function BillProductVisorItemModalForm({
	data,
	onClose,
}: Props) {
	const { foreignExchange } = useGlobalContext();
	const { currentBill, setCurrentBill } = useBillContext();

	const formik = useFormik<BillItem>({
		initialValues: { ...data, quantity: 0 },
		validationSchema: Yup.object({
			quantity: Yup.string(),
		}),
		onSubmit: (formData) => {
			event?.preventDefault();

			const newBill = updateBillItem(currentBill, formData, foreignExchange);
			setCurrentBill(newBill);
			onClose();
		},
	});

	return (
		<>
			{/* <Button onClick={handleOpen}>Nueva referencia</Button> */}
			<Modal
				open
				onClose={onClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: "90%",
						maxHeight: "90%",
						overflowY: "auto",
						bgcolor: "background.paper",
						// border: "2px solid #000",
						boxShadow: 24,
						pt: 2,
						px: 4,
						pb: 3,
					}}
					component={"form"}
					onSubmit={formik.handleSubmit}
				>
					<Grid container component={"form"} spacing={1}>
						<Grid item xs={12}>
							<TextField
								autoFocus
								label="Cantidad"
								type="number"
								placeholder="Cantidad"
								variant="outlined"
								name="quantity"
								onKeyDown={(event) => {
									if (event.key === "Enter") formik.submitForm();
								}}
								value={formik.values.quantity || ""}
								onChange={formik.handleChange}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
}
