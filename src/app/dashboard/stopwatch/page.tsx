"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";

import { asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import { useStopwatchContext } from "@/app/dashboard/stopwatch/context/Stopwatch.context";
import ClockItem from "./components/ClockItem";
import StopwatchForm from "./components/StopwatchForm";
import { Stopwatch } from "@/types";

export default function StopwatchHome() {
	const theme = useTheme();

	const { stopwatches, setStopwatchData } = useStopwatchContext();

	const [openStopwatchForm, setOpenStopwatchForm] = useState(false);
	const [editing, setEditing] = useState(false);
	
	return (
		<>
			<AppBarModule
				name="Cronometros"
				right={
					<>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={() => {
								setEditing(!editing);
							}}
							// sx={{ mr: 2}}
						>
							<EditIcon />
						</IconButton>

						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="end"
							onClick={() => {
								setOpenStopwatchForm(true);
							}}
							// sx={{ mr: 2}}
						>
							<AddIcon />
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

				<Grid container spacing={2}>
					{stopwatches.map((t) => (
						<Grid item key={t._id} xs={12} sm={12} md={6} lg={4} xl={3}>
							<ClockItem
								data={t}
								onEdit={() => {
									setStopwatchData(t);
									setOpenStopwatchForm(true);
								}}
								editing={editing}
							/>
						</Grid>
					))}
				</Grid>

				{openStopwatchForm && (
					<StopwatchForm
						open={openStopwatchForm}
						setOpen={setOpenStopwatchForm}
					/>
				)}
			</Box>
		</>
	);
}
