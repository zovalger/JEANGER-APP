"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
	CurrencyType,
	Product,
	ProductReference,
	initialValuesProductReferenceManipulate,
} from "@/types";
import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import {
	createProductRequest,
	createUpdateProductsReference_Request,
	deleteProductRequest,
	deleteProductsReference_Request,
	updateProductRequest,
} from "@/api/Product.api";
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

export const initialValuesProductDataForm: Product = {
	_id: "",
	name: "",
	cost: 0,
	currencyType: CurrencyType.USD,
	keywords: [],
	priority: 0,
	favorite: false,
};

export default function ProductForm({ setOpen }: props) {
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

	const handleChange = async (key: string, value: string | boolean) => {
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
		setOpen(false);

		setProductReferenceManipulate(initialValuesProductReferenceManipulate);
		setProductDataForm(null);

		await refreshProducts();
	};

	// *******************************************************************
	// 													Referencias
	// *******************************************************************

	// todo: Añadir y eliminar todas las referencias

	const startSyncRefererences = async (product: Product) => {
		const { _id: childId } = product;
		const { toDelete, toAdd, current } = productReferenceManipulate;

		const indexedParents: { [productId: string]: ProductReference } = {};

		current.map((item) => {
			indexedParents[item.parentId] = item;
		});

		try {
			await Promise.all([
				...toDelete.map(async (parentId) => {
					try {
						await deleteProductsReference_Request(parentId, childId);
					} catch (error) {}
				}),
				...toAdd.map(
					async (parentId) =>
						await createUpdateProductsReference_Request({
							...indexedParents[parentId],
							childId,
						})
				),
			]);
		} catch (error) {}
	};

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

				await startSyncRefererences(product);

				await handleClose();
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
						<Grid item xs={12} md={8}>
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
						<Grid item xs={12} sm={6} md={2}>
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
						<Grid item xs={12} sm={6} md={2}>
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
						<Grid item xs={12}>
							<TextField
								label="Prioridad"
								type="number"
								name="priority"
								value={formik.values.priority}
								onChange={(e) => {
									const { name, value } = e.target;
									formik.handleChange(e);
									handleChange(name, value);
								}}
								fullWidth
							/>
						</Grid>

						<FormControlLabel
							control={
								<Checkbox
									checked={formik.values.favorite}
									name="favorite"
									onChange={(e) => {
										const { name, checked } = e.target;

										formik.handleChange(e);
										handleChange(name, checked);
									}}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
							label="Favorito"
						/>
					</Grid>

					<ProductFormReferences />

					<ProductFromKeywordStack />

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
						{formik.values._id && (
							<Button color="error" onClick={onDelete} sx={{ mr: "auto" }}>
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
