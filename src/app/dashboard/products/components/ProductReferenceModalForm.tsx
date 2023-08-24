"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import { v4 as uuid } from "uuid";

import { CurrencyType, Product, ProductReference } from "@/types";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductFormStyle from "./ProductFormStyle";
import { Grid } from "@mui/material";

// *****************************************************************************
// 											form de referencias
// *****************************************************************************

interface ReferenceModalFormProps {
	onSubmit(formData: ProductReference): void;
	onDelete(_id: string): void;
	onClose(): void;
}

const initialValues = {
	_id: "",
	parentId: "",
	childId: "",
	cost: 0,
	currencyType: CurrencyType.USD,
	percentage: 1,
	amount: 1,
};

export default function ProductReferenceModalForm({
	// funciones
	onSubmit,
	onDelete,
	onClose,
}: ReferenceModalFormProps) {
	const { productsIndexed, productReferenceManipulate } = useProductContext();
	const { editing, current, posibleParents } = productReferenceManipulate;

	const formik = useFormik({
		initialValues: editing || initialValues,
		validationSchema: Yup.object({
			_id: Yup.string().optional(),
			parentId: Yup.string(),
			percentage: Yup.number().positive(),
			amount: Yup.number().positive(),
		}),
		onSubmit: onSubmit,
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
						width: "90%",
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
						<Grid item xs={12} md={8}>
							<TextField
								select
								defaultValue={""}
								name="parentId"
								value={formik.values.parentId}
								onChange={formik.handleChange}
								placeholder="Seleccione un producto"
								InputProps={{
									readOnly: !!formik.values._id,
								}}
								fullWidth
							>
								{/* <MenuItem key={uuid()} value={"0"}>
								Seleccione uno
							</MenuItem> */}

								{/* si la referencia tiene id mostramos las actuales
							 sino se muestran las posibles referencias padres */}
								{formik.values._id
									? current.map((r) => (
											<MenuItem key={r._id} value={r.parentId}>
												{productsIndexed[r.parentId].name}{" "}
												{productsIndexed[r.parentId].cost.toFixed(2)}
											</MenuItem>
									  ))
									: posibleParents.map((productId) => {
											const { name, cost, currencyType } =
												productsIndexed[productId];

											return (
												<MenuItem key={productId} value={productId}>
													{`${name}: ${cost.toFixed(2)} ${currencyType}`}
												</MenuItem>
											);
									  })}
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								label="Porcentaje"
								placeholder="Porcentaje"
								variant="outlined"
								name="percentage"
								value={formik.values.percentage}
								onChange={formik.handleChange}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<TextField
								label="Cantidad"
								placeholder="Cantidad"
								variant="outlined"
								name="amount"
								value={formik.values.amount}
								onChange={formik.handleChange}
								fullWidth
							/>
						</Grid>
					</Grid>

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
						{formik.values._id && (
							<Button
								color="error"
								onClick={() => onDelete(formik.values.parentId)}
								sx={{ mr: "1rem" }}
							>
								Eliminar
							</Button>
						)}

						<Button
							color="primary"
							onClick={() => formik.submitForm()}
							variant="contained"
							// type="submit"
							startIcon={<SaveIcon />}
						>
							Guardar
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}
