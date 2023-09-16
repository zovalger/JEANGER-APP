"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

import { BillItem } from "@/types";
import { useBillContext } from "../context/Bill.context";
import { clearBill, updateBillItem } from "../helpers/Bill.helpers";
import { useGlobalContext } from "@/contexts/Global.context";
import { addBillToList } from "../helpers/BillList.helpers";

// *****************************************************************************
// 											form de referencias
// *****************************************************************************

interface Props {
	onClose(): void;
}

export default function BillListVisorModalForm({ onClose }: Props) {
	const { currentBill, setCurrentBill, sendBillBroadcast, bills, setBills } =
		useBillContext();

	const saveBillInServer = async () => {
		if (!currentBill) return;

		const newBillList = addBillToList(bills, {
			...currentBill,
			date: new Date(),
		});

		sendBillBroadcast(currentBill);

		setBills(newBillList);

		setCurrentBill(clearBill());
	};

	const handdleChange = (value: string) => {
		if (!currentBill) return;

		setCurrentBill({ ...currentBill, name: value });
	};

	const onSubmit = async () => {
		await saveBillInServer();
		onClose();
	};

	if (!currentBill || !currentBill.items.length) return;

	return (
		<>
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
					onSubmit={(e) => e.preventDefault()}
				>
					<Grid container component={"form"} spacing={1}>
						<Grid item xs={12}>
							<TextField
								autoFocus
								label="Nombre"
								type="text"
								placeholder="Nombre"
								variant="outlined"
								autoComplete="none"
								name="name"
								onKeyDown={(event) => {
									if (event.key === "Enter") onSubmit();
								}}
								value={currentBill.name || ""}
								onChange={({ target: { value } }) => {
									handdleChange(value);
								}}
								fullWidth
							/>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
}
