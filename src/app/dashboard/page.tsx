"use client";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import AppBarModule from "../components/AppBarModule";
import { asidePanelDashboardWidth } from "@/config";
import CalculatorSwitch from "./components/CalculatorSwitch";
import DolarView from "./components/DolarView";

export default function Dashboard() {
	return (
		<>
			<AppBarModule name="Dashboard" />

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

				<DolarView />

				<CalculatorSwitch />
			</Box>
		</>
	);
}
