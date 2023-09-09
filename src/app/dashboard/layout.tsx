"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AsidePanelDashboard from "./components/AsidePanelDashboard";
import { useGlobalContext } from "@/contexts/Global.context";
import AsideMultiTools from "./components/AsideMultiTools";
import { Button } from "@mui/material";

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
