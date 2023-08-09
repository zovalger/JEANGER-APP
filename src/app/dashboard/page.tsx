"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Toolbar from "@mui/material/Toolbar";
import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "../components/AppBarModule";
import { useGlobalContext } from "@/contexts/Global.context";

export default function Dashboard() {
	const { dolar } = useGlobalContext();

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

				<Card sx={{ minWidth: 275 }}>
					<CardContent>
						<Typography variant="h5" component="div">
							Dolar: {dolar && dolar.value.toFixed(2)}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Actualizar</Button>
					</CardActions>
				</Card>
			</Box>
		</>
	);
}
