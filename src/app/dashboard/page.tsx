"use client";

import { useState } from "react";

import PageTemplate from "../components/PageTemplate";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { getGetCNE_CI_Request } from "@/api/Utility.api";

export default function Dashboard() {
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const handdleChange = (v: string) => {
		setValue(v);
	};
	const handdleSubmit = async () => {
		const ci = await getGetCNE_CI_Request(value);
		setName(ci);
	};
	return (
		<PageTemplate nameNavBar="Dashboard">
			<Typography>
				La calculadora esta en el boton abajo a la derecha
			</Typography>

			<Typography>Abrir o cerrar panel: Ctrl + b</Typography>

			<TextField
				label="Cédula"
				type="text"
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

			<Typography>{name}</Typography>
		</PageTemplate>
	);
}
