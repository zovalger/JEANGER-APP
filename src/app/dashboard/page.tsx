"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { asidePanelDashboardWidth } from "@/config";
import { useGlobalContext } from "@/contexts/Global.context";
import AppBarModule from "../components/AppBarModule";

export default function Dashboard() {
	return (
		<>
			<AppBarModule name="Responsive drawer" />

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
			</Box>
		</>
	);
}
