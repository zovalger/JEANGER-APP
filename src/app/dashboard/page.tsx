"use client"

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { asidePanelDashboardWidth } from "@/config";
import { useGlobalContext } from "@/contexts/Global.context";

export default function Dashboard() {
	const { handleAsidePanelToggle } = useGlobalContext();

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${asidePanelDashboardWidth}px)` },
					ml: { sm: `${asidePanelDashboardWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleAsidePanelToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar>

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
