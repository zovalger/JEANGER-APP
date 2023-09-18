"use client";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import { IconButton, Typography, Box } from "@mui/material";
import { getCNE_CI_Request } from "@/api/Utility.api";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

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

	const [copy, setCopy] = useState(false);

	return (
		<>
			<Typography sx={{ my: 1.5 }} fontSize={"1.1rem"} variant="h6">
				Consulta Cédula
			</Typography>
			<TextField
				label="Cédula"
				type="number"
				placeholder="Cédula"
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

			{name && (
				<Box sx={{ p: 1 }}>
					<Typography>
						{name}

						<CopyToClipboard
							text={name}
							onCopy={() => {
								setCopy(true);
								setTimeout(() => setCopy(false), 1000);
							}}
						>
							<IconButton>
								{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
							</IconButton>
						</CopyToClipboard>
					</Typography>
				</Box>
			)}
		</>
	);
}
