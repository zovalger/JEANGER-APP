"use client";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import { IconButton, Typography, Box, InputBase } from "@mui/material";
import { getCNE_CI_Request } from "@/api/Utility.api";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FormatSizeIcon from "@mui/icons-material/FormatSize";

export default function CNEConsultCI() {
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const handdleChange = (v: string) => {
		setValue(v);
	};

	const handdleSubmit = async () => {
		const ci = await getCNE_CI_Request(value);
		setName(ci);
	};

	const handdleClear = () => {
		setValue("");
		setName("");
	};

	const [copy, setCopy] = useState(false);
	const [copy2, setCopy2] = useState(false);

	return (
		<>
			<Box
				component={"form"}
				onSubmit={(e) => {
					e.preventDefault();

					handdleSubmit();
				}}
				sx={{
					boxShadow: 2,
					p: 2,
					borderRadius: "8px",
					mb: 2,
				}}
			>
				<Typography
					sx={{
						mb: 1,
						fontWeight: 600,
					}}
				>
					Consulta de cédula
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					V-
					<InputBase
						// label="Cédula"
						type="tel"
						placeholder="Cédula"
						// variant="outlined"
						autoComplete="none"
						name="ci"
						onKeyDown={(event) => {
							event.stopPropagation();
							if (event.key === "Escape") handdleSubmit();
						}}
						value={value || ""}
						onChange={({ target: { value } }) => {
							handdleChange(value);
						}}
						sx={{
							ml: 1,
							flexGrow: 1,
						}}
					/>
					{value && (
						<IconButton size="small" onClick={handdleClear}>
							<CloseIcon />
						</IconButton>
					)}
					<IconButton size="small" type="submit">
						<SearchIcon />
					</IconButton>
				</Box>

				{name && (
					<Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
						<Box sx={{ flexGrow: 1 }}>
							<Typography fontSize={"small"}>{name}</Typography>
						</Box>

						<CopyToClipboard
							text={name}
							onCopy={() => {
								setCopy(true);
								setTimeout(() => setCopy(false), 1000);
							}}
						>
							<IconButton size="small">
								{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
							</IconButton>
						</CopyToClipboard>

						<CopyToClipboard
							text={name.toUpperCase()}
							onCopy={() => {
								setCopy2(true);
								setTimeout(() => setCopy2(false), 1000);
							}}
						>
							<IconButton size="small">
								{copy2 ? <LibraryAddCheckIcon /> : <FormatSizeIcon />}
							</IconButton>
						</CopyToClipboard>
					</Box>
				)}
			</Box>
		</>
	);
}
