"use client";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import { IconButton, Typography, Box } from "@mui/material";
import { getCNE_CI_Request, getSaldoMovilnet_Request } from "@/api/Utility.api";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { saldoMovilnet } from "@/types";

export default function ConsultMovilnet() {
	const [saldoMovilnet, setSaldoMovilnet] = useState<saldoMovilnet | null>();

	const [value, setValue] = useState("");

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

	// const [copy, setCopy] = useState(false);

	return (
		<>
			<Typography sx={{ my: 1.5 }} fontSize={"1.1rem"} variant="h6">
				Consulta Movilnet
			</Typography>
			<TextField
				label="Numero"
				type="number"
				placeholder="Numero"
				variant="outlined"
				autoComplete="none"
				name="ci"
				onKeyDown={(event) => {
					if (event.key === "Enter") handdleSubmit();
				}}
				value={value || ""}
				onChange={({ target: { value } }) => {
					handdleChange(value);
				}}
				fullWidth
			/>

			{saldoMovilnet && (
				<Box sx={{ p: 1 }}>
					<Typography>{saldoMovilnet.saldo}</Typography>
					<Typography>{saldoMovilnet.status}</Typography>
					<Typography>{saldoMovilnet.date}</Typography>
				</Box>
			)}
		</>
	);
}
