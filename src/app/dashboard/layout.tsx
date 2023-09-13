"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AsidePanelDashboard from "./components/AsidePanelDashboard";
import AsideMultiTools from "./components/AsideMultiTools";


export default function Home(prop: any) {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AsidePanelDashboard />
			{prop.children}
			<AsideMultiTools />
		</Box>
	);
}
