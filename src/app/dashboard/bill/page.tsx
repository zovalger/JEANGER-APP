"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import { useGlobalContext } from "@/contexts/Global.context";
import { Product } from "@/types";
import BillProductItem from "./components/BillProductItem";
import BillAdder from "./components/BillAdder";
import { useBillContext } from "./context/Bill.context";
import { clearBill } from "./helpers/Bill.helpers";

export default function BillPage() {
	const { currentBill, setCurrentBill } = useBillContext();

	return (
		<>
			<AppBarModule
				name="Facturas"
				right={
					<>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={async () => {
								setCurrentBill(clearBill());
							}}
							// sx={{ mr: 2}}
						>
							<DeleteIcon />
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
