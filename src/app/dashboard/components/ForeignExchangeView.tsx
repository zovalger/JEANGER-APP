"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, IconButton, Button, Typography, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import EditIcon from "@mui/icons-material/Edit";

import { useGlobalContext } from "@/contexts/Global.context";
import { setForeignExchangeRequest } from "@/api/ForeignExchange.api";

export default function ForeignExchangeView() {
	const { foreignExchange, refreshForeignExchange } = useGlobalContext();

	const [editMode, setEditMode] = useState(false);
	const [copy, setCopy] = useState(false);
	const [copy2, setCopy2] = useState(false);

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const formik = useFormik({
		initialValues: { euro: 0, dolar: 0, date: new Date() },
		validationSchema: Yup.object({
			euro: Yup.number().positive().required(),
			dolar: Yup.number().positive().required(),
		}),
		onSubmit: async (data) => {
			const res = await setForeignExchangeRequest({
				...data,
				date: new Date(),
			});

			await refreshForeignExchange();
			toggleEditMode();
		},
	});

	return (
		<Box
			boxShadow={2}
			sx={{
				p: 2,
				borderRadius: "8px",
				mb: 2,
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="h6">Divisas</Typography>
				<IconButton onClick={toggleEditMode}>
					<EditIcon />
				</IconButton>
			</Box>

			{editMode ? (
				<>
					<TextField
						id="outlined-number"
						label="Dolar"
						type="number"
						name="dolar"
						fullWidth
						value={formik.values.dolar}
						onChange={formik.handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						sx={{ mt: 2 }}
						id="outlined-number"
						label="Euro"
						type="number"
						name="euro"
						fullWidth
						value={formik.values.euro}
						onChange={formik.handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 2 }}
						onClick={() => formik.submitForm()}
					>
						Cambiar
					</Button>
				</>
			) : (
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box>
						<Box>
							<Typography sx={{ fontSize: "1rem" }} component="span">
								<strong>Dolar: </strong>
								{foreignExchange && foreignExchange.dolar?.toFixed(2)}
							</Typography>

							{foreignExchange && (
								<CopyToClipboard
									text={foreignExchange.dolar?.toString().replace(".", ",")}
									onCopy={() => {
										setCopy(true);

										setTimeout(() => setCopy(false), 1000);
									}}
								>
									<IconButton>
										{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
									</IconButton>
								</CopyToClipboard>
							)}
						</Box>

						<Box>
							<Typography sx={{ fontSize: "1rem" }} component="span">
								<strong>Euro: </strong>
								{foreignExchange && foreignExchange.euro?.toFixed(2)}
							</Typography>

							{foreignExchange && (
								<CopyToClipboard
									text={foreignExchange.euro?.toString().replace(".", ",")}
									onCopy={() => {
										setCopy2(true);

										setTimeout(() => setCopy2(false), 1000);
									}}
								>
									<IconButton>
										{copy2 ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
									</IconButton>
								</CopyToClipboard>
							)}
						</Box>
					</Box>

					<Button onClick={refreshForeignExchange}>
						<ReplayIcon />
					</Button>
				</Box>
			)}
		</Box>
	);
}
