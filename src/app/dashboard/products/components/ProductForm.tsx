"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

import { CurrencyType, Product, ProductReference } from "@/types";
import { useProductContext } from "@/contexts/Product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductReferenceItem from "./ProductReferenceItem";
import { Backdrop, CircularProgress } from "@mui/material";
import { createProductRequest, updateProductRequest } from "@/api/Product.api";

interface props {
	// productDataForm: Product;
	open: boolean;
	setOpen(value: boolean): void;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "60vw",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

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

export default function ProductForm({ open, setOpen }: props) {
	const {
		products,
		setProducts,
		productDataForm,
		setProductDataForm,
		productsIndexed,
		setProductsIndexed,
	} = useProductContext();
	const [references, setReferences] = useState<ProductReference[]>([]);
	const [onSubmited, setOnSubmited] = useState(false);

	const formik = useFormik({
		initialValues: productDataForm || {
			_id: "",
			name: "",
			cost: 0,
			currencyType: CurrencyType.USD,
			keywords: [],
		},
		validationSchema: Yup.object({
			_id: Yup.string().default(""),
			name: Yup.string().required().default(""),
			cost: Yup.number().required().default(0),
			currencyType: Yup.string()
				.oneOf([CurrencyType.USD, CurrencyType.BSF])
				.default(CurrencyType.USD),
			keywords: Yup.array().required(),
		}),
		onSubmit: async (formData) => {
			try {
				setOnSubmited(true);

				const product = formData._id
					? await updateProductRequest(formData._id, formData)
					: await createProductRequest(formData);

				// guardamos en los indexados
				setProductsIndexed({ ...productsIndexed, [product._id]: product });

				// actualizamos o agregamos
				let newarray = formData._id
					? products.map((p) => (p._id === formData._id ? product : p))
					: [...products, product];

				setProducts(newarray);
				formik.setValues(product);
			} catch (error) {
				console.log(error);
			}
			setOnSubmited(false);
		},
	});

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setProductDataForm(null);
		setOpen(false);
	};

	const onDelete = async () => {
		try {
			if (!formik.values._id) return;

			setOnSubmited(true);

			delete productsIndexed[formik.values._id];

			// setProductsIndexed({ ...productsIndexed, [product._id]: undefined });
			setProductsIndexed(productsIndexed);
			setProducts(products.filter((p) => p._id !== formik.values._id));
			handleClose();
		} catch (error) {
			console.log(error);
		}

		setOnSubmited(false);
	};

	return (
		<div>
			{/* <Button onClick={handleOpen}>{productDataForm.name}</Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style }} component={"form"}>
					<Box>
						<TextField
							// label="Nombre del producto"
							placeholder="Nombre del producto"
							variant="outlined"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
						/>

						<TextField
							// label="Precio"
							placeholder="Precio"
							type="number"
							name="cost"
							value={formik.values.cost}
							onChange={formik.handleChange}
						/>

						<TextField
							id="outlined-select-currency"
							select
							// label="Moneda"

							defaultValue={CurrencyType.USD}
							name="currencyType"
							value={formik.values.currencyType}
							onChange={formik.handleChange}
						>
							{currencies.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>

					{formik.values._id && (
						<Box
							sx={{
								outline: "1px solid black",
								mt: "1rem",
							}}
						>
							{references.map((r) => (
								<ProductReferenceItem key={r._id} data={r} onClick={() => {}} />
							))}
							<ChildModal />
						</Box>
					)}

					<Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
						{formik.values._id && (
							<Button color="error" onClick={onDelete} sx={{ mr: "1rem" }}>
								Eliminar
							</Button>
						)}

						<LoadingButton
							loading={onSubmited}
							loadingPosition="start"
							startIcon={<SaveIcon />}
							variant="contained"
							onClick={() => formik.submitForm()}
						>
							Guardar
						</LoadingButton>
					</Box>
				</Box>
			</Modal>

			{/* Barra de carga */}
		</div>
	);
}

function ChildModal() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button onClick={handleOpen}>Open Child Modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box sx={{ ...style, width: 200 }}></Box>
			</Modal>
		</>
	);
}
