"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import { useStopwatchContext } from "@/contexts/Stopwatch.context";
import TimerItem from "./components/TimerItem";

export default function StopwatchHome() {
	const { stopwatches } = useStopwatchContext();
	return (
		<>
			<AppBarModule
				name="Cronometros"
				right={
					<></>
					// <IconButton
					// 	color="inherit"
					// 	aria-label="open drawer"
					// 	edge="end"
					// 	onClick={() => {
					// 		setopenProductForm(true);
					// 	}}
					// 	// sx={{ mr: 2}}
					// >
					// 	<AddIcon />
					// </IconButton>
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
				
				{stopwatches.map((t) => (
					<TimerItem key={t._id} data={t} />
				))}
			</Box>
		</>
	);
}
