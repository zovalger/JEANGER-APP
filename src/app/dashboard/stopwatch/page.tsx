"use client";

import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { useStopwatchContext } from "@/app/dashboard/stopwatch/context/Stopwatch.context";
import ClockItem from "./components/ClockItem";
import StopwatchForm from "./components/StopwatchForm";
import PageTemplate from "@/app/components/PageTemplate";

export default function StopwatchHome() {
	const { stopwatches, setStopwatchData } = useStopwatchContext();

	const [openStopwatchForm, setOpenStopwatchForm] = useState(false);
	const [editing, setEditing] = useState(false);

	return (
		<PageTemplate
			nameNavBar="Cronometros"
			rightIcons={
				<>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={() => {
							setEditing(!editing);
						}}
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
					>
						<AddIcon />
					</IconButton>
				</>
			}
		>
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
		</PageTemplate>
	);
}
