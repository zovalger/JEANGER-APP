"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AsidePanelDashboard from "./components/AsidePanelDashboard";
import { useGlobalContext } from "@/contexts/Global.context";

export default function Home(prop: any) {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AsidePanelDashboard />

			{prop.children}
		</Box>
	);
}
