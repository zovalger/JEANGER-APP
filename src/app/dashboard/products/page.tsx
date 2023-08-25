"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import ProductItem from "./components/ProductItem";
import ProductForm, {
	initialValuesProductDataForm,
} from "./components/ProductForm";
import { useGlobalContext } from "@/contexts/Global.context";
import { CurrencyType } from "@/types";
import ProductBasicSearch from "./components/ProductBasicSearch";

export default function Dashboard() {
	const { loadViewOpen, loadViewClose } = useGlobalContext();
	const {
		products,
		inQuery,
		productsInQuery,
		setProductDataForm,
		refreshProducts,
	} = useProductContext();
	const [openProductForm, setOpenProductForm] = useState<boolean>(false);

	// const [open, setOpen] = useState(false);
	// const handleClose = () => setOpen(false);
	// const handleOpen = () => setOpen(true);

	return (
		<>
			<AppBarModule
				name="Productos"
				right={
					<>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={async () => {
								try {
									loadViewOpen();
									await refreshProducts();
								} catch (error) {
									console.log(error);
								}
								loadViewClose();
							}}
							// sx={{ mr: 2}}
						>
							<RefreshIcon />
						</IconButton>

						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={() => {
								setProductDataForm(initialValuesProductDataForm);
								setOpenProductForm(true);
							}}
							// sx={{ mr: 2}}
						>
							<AddIcon />
						</IconButton>
					</>
				}
			/>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${asidePanelDashboardWidth}px)` },
					height: "100vh",
					overflow: "hidden",
					overflowY: "scroll",
				}}
			>
				<Toolbar />

				<ProductBasicSearch />

				{!inQuery
					? products.map((p) => (
							<ProductItem
								key={p._id}
								data={p}
								onClick={() => {
									setOpenProductForm(true);
									setProductDataForm(p);
								}}
							/>
					  ))
					: productsInQuery.map((p) => (
							<ProductItem
								key={p._id}
								data={p}
								onClick={() => {
									setOpenProductForm(true);
									setProductDataForm(p);
								}}
							/>
					  ))}

				{openProductForm && <ProductForm setOpen={setOpenProductForm} />}
			</Box>

			{/* <Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop> */}
		</>
	);
}
