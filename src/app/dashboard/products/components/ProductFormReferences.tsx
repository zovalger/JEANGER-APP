import { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";

import { useProductContext } from "../context/Product.context";
import ProductReferenceItem from "./ProductReferenceItem";
import ProductReferenceModalForm from "./ProductReferenceModalForm";
import { ProductReference } from "@/types";

import {
	getPosibleProductParents_by_productId_Request,
	getProductsReferences_by_productChild_Request,
} from "@/api/Product.api";

export default function ProductFormReferences() {
	const {
		products,
		productDataForm,
		productReferenceManipulate,
		setProductReferenceManipulate,
	} = useProductContext();

	const { toAdd, current, toDelete, posibleParents } =
		productReferenceManipulate;

	// *******************************************************************
	// 													funcionalidades
	// *******************************************************************

	// *******************************************************************
	// 													Modal
	// *******************************************************************

	const [openModal, setOpenModal] = useState(false);

	const onOpenModal = (referece: ProductReference | null) => {
		if (referece)
			setProductReferenceManipulate((prev) => ({
				...prev,
				editing: referece,
			}));

		setOpenModal(true);
	};

	const onCloseModal = () => {
		setOpenModal(false);
		setProductReferenceManipulate((prev) => ({ ...prev, editing: null }));
	};

	const handdleOnSubmitModal = (formData: ProductReference) => {
		const data = !formData._id ? { ...formData, _id: uuid() } : formData;

		const toA = !toAdd.includes(data._id) ? [...toAdd, data._id] : toAdd;

		const toD = toDelete.includes(data._id)
			? toDelete.filter((_id) => _id != data._id)
			: toDelete;

		const currIndex = current.findIndex((item) => item._id === data._id);

		const curr =
			currIndex >= 0
				? current.map((item) => (item._id === data._id ? data : item))
				: [...current, data];

		const posParent = posibleParents.filter((item) => item != data.parentId);

		setProductReferenceManipulate((prev) => ({
			...prev,
			toAdd: toA,
			toDelete: toD,
			current: curr,
			posibleParents: posParent,
		}));

		onCloseModal();
	};
	const handdleOnDeleteReference = (_id: string) => {
//todo: eliminar de toAdd
//todo: eliminar de current
//todo: añadir a toDelete
//todo: añadir a posibleParent


	};

	// *******************************************************************
	// 													peticiones
	// *******************************************************************

	const getAllDataReferenceOfThisProduct = async () => {
		if (!productDataForm) return;

		const { _id } = productDataForm;

		if (!_id)
			return setProductReferenceManipulate((prev) => ({
				...prev,
				posibleParents: products.map((p) => p._id),
			}));

		try {
			const posibleParents =
				await getPosibleProductParents_by_productId_Request(_id);

			const current = await getProductsReferences_by_productChild_Request(_id);

			setProductReferenceManipulate((prev) => ({
				...prev,
				posibleParents,
				current,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllDataReferenceOfThisProduct();
	}, []);

	// *******************************************************************
	// 													render
	// *******************************************************************

	if (!productDataForm) return;

	return (
		<>
			<Typography>Referencias</Typography>
			<Box
				sx={{
					outline: "1px solid black",
					mt: "1rem",
					borderRadius: "4px",
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
						<Typography>Nombre</Typography>
					</Grid>
					<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
						<Typography>Costo</Typography>
					</Grid>
					<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
						<Typography>Porcetaje</Typography>
					</Grid>
					<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
						<Typography>cantidad</Typography>
					</Grid>
				</Grid>
				{/* lista de referencias */}
				{current.map((r) => (
					<ProductReferenceItem
						key={r._id}
						data={r}
						onClick={() => {
							onOpenModal(r);
						}}
					/>
				))}

				<Button onClick={() => onOpenModal(null)}>Añadir</Button>

				{/* panel de formulario de referencia */}
				{openModal && (
					<ProductReferenceModalForm
						onSubmit={handdleOnSubmitModal}
						onClose={onCloseModal}
						onDelete={handdleOnDeleteReference}
					/>
				)}
			</Box>
		</>
	);
}
