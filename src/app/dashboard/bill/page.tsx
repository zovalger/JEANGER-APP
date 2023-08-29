"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import { useGlobalContext } from "@/contexts/Global.context";
import { Product } from "@/types";
import ProductItem from "./components/BillProductItem";
import BillAdder from "./components/BillAdder";

export default function BillPage() {
	const { loadViewOpen, loadViewClose } = useGlobalContext();
	const { products, refreshProducts } = useProductContext();

	// const [inQuery, setInQuery] = useState(false);

	// const showLimitedProducts = (arr: Product[]) => {
	// 	const limited = arr.slice(0, 15);

	// 	return limited.map(({ _id }) => (
	// 		<ProductItem key={_id} _id={_id} onClick={() => {}} />
	// 	));
	// };

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

        <BillAdder />

				{/* {inQuery && showLimitedProducts(products)} */}
			</Box>
		</>
	);
}
