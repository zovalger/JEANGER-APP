"use client";

import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Toolbar from "@mui/material/Toolbar";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "../components/AppBarModule";
import { useGlobalContext } from "@/contexts/Global.context";
import CalculatorSwitch from "./components/CalculatorSwitch";

export default function Dashboard() {
	const { dolar, refreshDolar, loadViewOpen, loadViewClose } =
		useGlobalContext();

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

				<Card sx={{ minWidth: 275 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							Dolar: {dolar && dolar.value}
						</Typography>
					</CardContent>
					<CardActions>
						<Button
							size="small"
							onClick={async () => {
								try {
									loadViewOpen();
									await refreshDolar();
								} catch (error) {
									console.log(error);
								}
								loadViewClose();
							}}
						>
							Actualizar
						</Button>
					</CardActions>
				</Card>


				<CalculatorSwitch />
			</Box>
		</>
	);
}
