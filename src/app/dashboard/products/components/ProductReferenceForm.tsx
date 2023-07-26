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

import { useProductContext } from "@/contexts/Product.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductFormStyle from "./ProductFormStyle";

// *****************************************************************************
// 											form de referencias
// *****************************************************************************

interface ReferenceModalFormProps {
	data: ProductReference | null;
	childId: string;
	currentReferences: ProductReference[];
	productsIdToParent: string[];

	on_Submit(formData: ProductReference): void;
	onDelete(_id: string): void;
	close(): void;
}

export default function ReferenceModalForm({
	// datos de la referencia
	data,
	childId,
	currentReferences,
	productsIdToParent,

	// funciones
	on_Submit,
	onDelete,
	close,
}: ReferenceModalFormProps) {
	const { productsIndexed } = useProductContext();

	const formik = useFormik({
		initialValues: data || {
			_id: "",
			parentId: "",
			childId: "",
			cost: 0,
			currencyType: CurrencyType.USD,
			percentage: 1,
			amount: 1,
		},
		validationSchema: Yup.object({
			_id: Yup.string().optional(),
			parentId: Yup.string(),
			// childId: Yup.string(),
			// cost: Yup.number().positive(),
			// currencyType: Yup.string()
			// 	.oneOf([CurrencyType.USD, CurrencyType.BSF])
			// 	.default(CurrencyType.USD),
			percentage: Yup.number().positive(),
			amount: Yup.number().positive(),
		}),
		onSubmit: async (formData) => {
			console.log(formData);

			const { _id } = formData;
			const { cost, currencyType } = productsIndexed[formData.parentId];

			const toSend = {
				...formData,
				cost,
				currencyType,
				childId,
				_id: _id ? _id : uuid(),
			};

			console.log(formData);

			return on_Submit(toSend);
		},
	});

	return (
		<>
			{/* <Button onClick={handleOpen}>Nueva referencia</Button> */}
			<Modal
				open
				onClose={close}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box
					sx={{ ...ProductFormStyle, width: "70vw" }}
					component={"form"}
					onSubmit={formik.handleSubmit}
				>
					<Box sx={{ display: "flex" }}>
						<TextField
							select
							defaultValue={""}
							name="parentId"
							value={formik.values.parentId}
							onChange={formik.handleChange}
							sx={{ flexGrow: 1 }}
							placeholder="Seleccione un producto"
							InputProps={{
								readOnly: !!data,
							}}
						>
							{/* <MenuItem key={uuid()} value={"0"}>
								Seleccione uno
							</MenuItem> */}

							{data
								? currentReferences.map((r) => (
										<MenuItem key={r._id} value={r.parentId}>
											{productsIndexed[r.parentId].name}{" "}
											{productsIndexed[r.parentId].cost}
										</MenuItem>
								  ))
								: productsIdToParent.map((productId) => {
										const { name, cost, currencyType } =
											productsIndexed[productId];

										return (
											<MenuItem key={productId} value={productId}>
												{`${name}: ${cost} ${currencyType}`}
											</MenuItem>
										);
								  })}
						</TextField>

						<TextField
							label="Porcentaje"
							placeholder="Porcentaje"
							variant="outlined"
							name="percentage"
							value={formik.values.percentage}
							onChange={formik.handleChange}
							sx={{ width: "6rem" }}

							// fullWidth
						/>

						<TextField
							label="Cantidad"
							placeholder="Cantidad"
							variant="outlined"
							name="amount"
							value={formik.values.amount}
							onChange={formik.handleChange}
							sx={{ width: "6rem" }}

							// fullWidth
						/>
					</Box>

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
