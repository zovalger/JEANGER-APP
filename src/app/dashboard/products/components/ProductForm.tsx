"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { CurrencyType, initialValuesProductReferenceManipulate } from "@/types";
import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import {
	createProductRequest,
	createUpdateProductsReference_Request,
	deleteProductRequest,
	deleteProductsReference_Request,
	getPosibleProductParents_by_productId_Request,
	getProductsReferences_by_productChild_Request,
	updateProductRequest,
} from "@/api/Product.api";
import { useGlobalContext } from "@/contexts/Global.context";
import ProductFromKeywordStack from "./ProductFromKeywordStack";
import ProductFormReferences from "./ProductFormReferences";

interface props {
	setOpen(value: boolean): void;
}

const currencies = [
	{
		value: CurrencyType.USD,
		label: "USD",
	},
	{
		value: CurrencyType.BSF,
		label: "BSF",
	},
];

export const initialValuesProductDataForm = {
	_id: "",
	name: "",
	cost: 0,
	currencyType: CurrencyType.USD,
	keywords: [],
};

export default function ProductForm({ setOpen }: props) {
	const { dolar } = useGlobalContext();

	const {
		productDataForm,
		setProductDataForm,
		refreshProducts,
		productReferenceManipulate,
		setProductReferenceManipulate,
	} = useProductContext();

	// *******************************************************************
	// 													Funcionalidades
	// *******************************************************************

	const handleChange = async (key: string, value: string) => {
		const newValue = productDataForm
			? { ...productDataForm, [key]: value }
			: { ...initialValuesProductDataForm, [key]: value };

		setProductDataForm(newValue);
	};

	const onDelete = async () => {
		if (!productDataForm) return;
		const { _id } = productDataForm;
		try {
			const res = await deleteProductRequest(_id);
			console.log("eliminado");

			if (res) handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = async () => {
		await refreshProducts();

		setProductDataForm(null);
		setProductReferenceManipulate(initialValuesProductReferenceManipulate);

		setOpen(false);
	};

	// *******************************************************************
	// 													Referencias
	// *******************************************************************

	// todo: Añadir y eliminar todas las referencias

	// *******************************************************************
	// 													Formulario
	// *******************************************************************

	const [onSubmited, setOnSubmited] = useState(false);

	const formik = useFormik({
		initialValues: productDataForm || initialValuesProductDataForm,
		validationSchema: Yup.object({
			_id: Yup.string().default(""),
			name: Yup.string().required().default(""),
			cost: Yup.number().required().default(0),
			currencyType: Yup.string()
				.oneOf([CurrencyType.USD, CurrencyType.BSF])
				.default(CurrencyType.USD),
			keywords: Yup.array().required(),
		}),
		onSubmit: async () => {
			if (onSubmited) return;
			if (!productDataForm)
				return console.log("no hay datos para subir", productDataForm);

			setOnSubmited(true);
			console.log("subiendo");

			const dataToSend = productDataForm;

			try {
				const product = !dataToSend._id
					? await createProductRequest(dataToSend)
					: await updateProductRequest(dataToSend._id, dataToSend);

				formik.setValues(product);
				setProductDataForm(product);
			} catch (error) {
				console.log(error);
			}

			setOnSubmited(false);
		},
	});

	// *******************************************************************
	// 													peticiones
	// *******************************************************************

	// *******************************************************************
	// 													render
	// *******************************************************************

	return (
		<div>
			{/* <Button onClick={handleOpen}>{productDataForm.name}</Button> */}
			<Modal
				open
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
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
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							mb: "1rem",
						}}
					>
						<Typography variant="h6">Formulario de producto</Typography>
						<Button onClick={handleClose}>
							<CloseIcon />
						</Button>
					</Box>
					<Grid container component={"form"} spacing={1}>
						<Grid item xs={12}  md={8}>
							<TextField
								// label="Nombre del producto"
								placeholder="Nombre del producto"
								variant="outlined"
								name="name"
								value={formik.values.name}
								onChange={(e) => {
									const { name, value } = e.target;
									formik.handleChange(e);
									handleChange(name, value);
								}}
								autoComplete="none"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12 } sm={6}  md={2}>
							<TextField
								// label="Precio"
								placeholder="Precio"
								type="number"
								name="cost"
								value={formik.values.cost}
								onChange={(e) => {
									const { name, value } = e.target;
									formik.handleChange(e);
									handleChange(name, value);
								}}
								style={{ textAlign: "end" }}
								sx={{ textAlign: "end" }}
								fullWidth

								// disabled={!!currentReferences.length}
							/>
						</Grid>
						<Grid item xs={12} sm={6}  md={2}>
							<TextField
								id="outlined-select-currency"
								select
								// label="Moneda"

								defaultValue={CurrencyType.USD}
								name="currencyType"
								value={formik.values.currencyType}
								onChange={(e) => {
									const { name, value } = e.target;
									formik.handleChange(e);
									handleChange(name, value);
								}}
								// disabled={!!currentReferences.length}
								fullWidth
							>
								{currencies.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>

					<ProductFormReferences />

					<ProductFromKeywordStack />

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
						{formik.values._id && (
							<Button color="error" onClick={onDelete} sx={{ mr: "1rem" }}>
								Eliminar
							</Button>
						)}

						<Button variant="contained" onClick={() => formik.submitForm()}>
							Guardar
						</Button>
					</Box>
				</Box>
			</Modal>

			{/* Barra de carga */}
		</div>
	);
}
