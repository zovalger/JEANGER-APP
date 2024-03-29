"use client";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import { IconButton, Typography, Box, InputBase } from "@mui/material";
import { getSaldoMovilnet_Request } from "@/api/Utility.api";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import { saldoMovilnet } from "@/types";

export default function ConsultMovilnet() {
	const [saldoMovilnet, setSaldoMovilnet] = useState<saldoMovilnet | null>();

	const [value, setValue] = useState("");

	const [copy, setCopy] = useState(false);
	const handdleChange = (v: string) => {
		setValue(v);
	};

	const handdleSubmit = async () => {
		try {
			const result = await getSaldoMovilnet_Request(value);

			setSaldoMovilnet(result);
		} catch (error) {
			console.log(error);
		}
	};

	const handdleClear = () => {
		setValue("");
		setSaldoMovilnet(null);
	};

	// const [copy, setCopy] = useState(false);

	return (
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
				Consulta Movilnet
			</Typography>

			<Box sx={{ display: "flex", alignItems: "center" }}>
				Tlf.:
				<InputBase
					// label="Cédula"
					type="tel"
					placeholder="Número"
					// variant="outlined"
					autoComplete="none"
					name="tlf"
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
				<CopyToClipboard
					text={value.trim().replace(/^0/, "")}
					onCopy={() => {
						setCopy(true);
						setTimeout(() => setCopy(false), 1000);
					}}
				>
					<IconButton size="small">
						{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
					</IconButton>
				</CopyToClipboard>
				<IconButton size="small" type="submit">
					<SearchIcon />
				</IconButton>
			</Box>

			{saldoMovilnet && (
				<>
					<Typography sx={{ fontWeight: 600 }}>
						BS {saldoMovilnet.saldo}
					</Typography>
					<Typography component={"span"} fontSize={"small"} sx={{ mr: 1 }}>
						{saldoMovilnet.status}
					</Typography>
					<Typography component={"span"} fontSize={"small"}>
						{saldoMovilnet.date}
					</Typography>
				</>
			)}
		</Box>
	);
}
