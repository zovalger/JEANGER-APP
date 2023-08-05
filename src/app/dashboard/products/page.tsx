"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import ProductItem from "./components/ProductItem";
import ProductForm from "./components/ProductForm";

export default function Dashboard() {
	const { products, setProductDataForm } = useProductContext();
	const [openProductForm, setopenProductForm] = useState<boolean>(false);

	return (
		<>
			<AppBarModule
				name="Productos"
				right={
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="end"
						onClick={() => {
							setopenProductForm(true);
						}}
						// sx={{ mr: 2}}
					>
						<AddIcon />
					</IconButton>
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

				{products.map((d) => (
					<ProductItem
						key={d._id}
						data={d}
						onClick={() => {
							setopenProductForm(true);
							setProductDataForm(d);
						}}
					/>
				))}

				{openProductForm && (
					<ProductForm open={openProductForm} setOpen={setopenProductForm} />
				)}
			</Box>
		</>
	);
}
