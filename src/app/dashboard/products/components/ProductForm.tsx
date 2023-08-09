"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { v4 as uuid } from "uuid";

import {
	CurrencyType,
	Product,
	ProductReference,
	ProductReferenceForm,
} from "@/types";
import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductReferenceItem from "./ProductReferenceItem";
import {
	createProductRequest,
	createUpdateProductsReference_Request,
	deleteProductRequest,
	deleteProductsReference_Request,
	getPosibleProductParents_by_productId_Request,
	getProductsReferences_by_productChild_Request,
	updateProductRequest,
} from "@/api/Product.api";
import ProductFormStyle from "./ProductFormStyle";
import ReferenceModalForm from "./ProductReferenceForm";
import { useGlobalContext } from "@/contexts/Global.context";

interface props {
	// productDataForm: Product;
	open: boolean;
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

export default function ProductForm({ open, setOpen }: props) {
	const { dolar, loadViewOpen, loadViewClose } = useGlobalContext();

	const {
		products,
		setProducts,
		productDataForm,
		setProductDataForm,
		productsIndexed,
		setProductsIndexed,
		refreshProducts,
	} = useProductContext();

	// *******************************************************************
	// 													productos
	// *******************************************************************

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

				// actualizar referencias
				await saveChangesProductReferences();

				handleClose();
			} catch (error) {
				console.log(error);
			}
			setOnSubmited(false);
		},
	});

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = async () => {
		setProductDataForm(null);
		setOpen(false);

		loadViewOpen();

		await refreshProducts();

		loadViewClose();
	};

	const onDelete = async () => {
		try {
			if (!formik.values._id) return;

			setOnSubmited(true);

			await deleteProductRequest(formik.values._id);

			// setProductsIndexed({ ...productsIndexed, [product._id]: undefined });
			delete productsIndexed[formik.values._id];
			setProductsIndexed(productsIndexed);
			setProducts(products.filter((p) => p._id !== formik.values._id));
			handleClose();
		} catch (error) {
			console.log(error);
		}

		setOnSubmited(false);
	};

	// *******************************************************************
	// 													Referencias
	// *******************************************************************

	// referencias actuales
	const [currentReferences, setCurrentReferences] = useState<
		ProductReference[]
	>([]);

	const [deletedReferences, setDeletedReferences] = useState<string[]>([]);

	// posibles padres
	const [productsIdToParent, setProductsIdToParent] = useState<string[]>([]);

	// controles del modal
	const [modalReference, setModalReference] = useState(false);
	const openModalReference = () => setModalReference(true);
	const closeModalReference = () => {
		setReferenceForm(null);
		setModalReference(false);
	};

	// datos del formulario
	const [referenceForm, setReferenceForm] = useState<ProductReference | null>(
		null
	);

	// funciones
	const onOpenReference = (referenceId: string) => {
		const r = currentReferences.find((re) => re._id === referenceId);

		if (!r) return;
		setReferenceForm(r);
		openModalReference();
	};

	const onCreateUpdateReference = (rp: ProductReference) => {
		const i = currentReferences.findIndex((v) => v._id === rp._id);

		if (i < 0) {
			setCurrentReferences([...currentReferences, rp]);
		} else {
			const newReferences = currentReferences.map((r) =>
				r._id === rp._id ? rp : r
			);

			setCurrentReferences(newReferences);
			updateCostByReferences(newReferences);
		}

		closeModalReference();
	};

	const onDeleteParentProductReference = (parentId: string) => {
		setDeletedReferences([...deletedReferences, parentId]);

		const newReferences = currentReferences.filter(
			(v) => v.parentId !== parentId
		);

		setCurrentReferences(newReferences);
		updateCostByReferences(newReferences);
		closeModalReference();
	};

	const updateCostByReferences = (rs: ProductReference[]) => {
		if (!dolar) return;

		const newCost = rs.reduce((total: number, reference: ProductReference) => {
			const { cost, currencyType, amount, percentage } = reference;

			let toSum = cost * percentage * amount;

			if (currencyType == CurrencyType.BSF) toSum = toSum / dolar.value;

			console.log(reference, toSum);

			return total + toSum;
		}, 0);

		formik.setFieldValue("cost", newCost);
	};

	const saveChangesProductReferences = async () => {
		await Promise.all(
			await deletedReferences.map(
				async (r) => await deleteProductsReference_Request(r, formik.values._id)
			)
		);

		await Promise.all(
			await currentReferences.map(
				async (r) => await createUpdateProductsReference_Request(r)
			)
		);
	};

	// *******************************************************************
	// 													peticiones
	// *******************************************************************

	useEffect(() => {
		if (!productDataForm || !productDataForm._id) return;

		getProductsReferences_by_productChild_Request(productDataForm._id)
			.then((pr) => setCurrentReferences(pr))
			.catch((error) => console.log(error));

		getPosibleProductParents_by_productId_Request(productDataForm._id)
			.then((ids) => setProductsIdToParent(ids))
			.catch((error) => console.log(error));
	}, [productDataForm]);

	// *******************************************************************
	// 													render
	// *******************************************************************

	return (
		<div>
			{/* <Button onClick={handleOpen}>{productDataForm.name}</Button> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...ProductFormStyle }}>
					<Box sx={{ display: "flex" }} component={"form"}>
						<TextField
							// label="Nombre del producto"
							placeholder="Nombre del producto"
							variant="outlined"
							name="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							sx={{ flexGrow: 1 }}
							autoComplete="none"

							// fullWidth
						/>

						<TextField
							// label="Precio"
							placeholder="Precio"
							type="number"
							name="cost"
							value={formik.values.cost}
							onChange={formik.handleChange}
							style={{ textAlign: "end" }}
							sx={{ width: "7rem", textAlign: "end" }}
							disabled={!!currentReferences.length}
						/>

						<TextField
							id="outlined-select-currency"
							select
							// label="Moneda"

							defaultValue={CurrencyType.USD}
							name="currencyType"
							value={formik.values.currencyType}
							onChange={formik.handleChange}
							sx={{ width: "6rem" }}
							disabled={!!currentReferences.length}
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
								borderRadius: "4px",
								height: "60vh",
							}}
						>
							{/* lista de referencias */}
							{currentReferences.map((r) => (
								<ProductReferenceItem
									key={r._id}
									data={r}
									onClick={() => {
										onOpenReference(r._id);
									}}
								/>
							))}

							<Button
								onClick={() => {
									openModalReference();
								}}
							>
								Añadir
							</Button>

							{/* panel de formulario de referencia */}
							{modalReference && (
								<ReferenceModalForm
									data={referenceForm}
									childId={formik.values._id}
									currentReferences={currentReferences}
									productsIdToParent={productsIdToParent}
									on_Submit={onCreateUpdateReference}
									onDelete={onDeleteParentProductReference}
									close={closeModalReference}
								/>
							)}
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
