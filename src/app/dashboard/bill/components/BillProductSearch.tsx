import { useEffect, useState } from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface props {
	value: string;
	adderValue: number | null;
	onChange(value: string): void;
	onClear(): void;
	onEnter(): void;
	moveSelected(direction: number): void;
}
export default function BillProductSearch({
	value,
	adderValue,
	onChange,
	onClear,
	onEnter,
	moveSelected,
}: props) {
	return (
		<Box sx={{ mb: "1rem", display: "flex" }}>
			<TextField
				sx={{ width: "3rem", mr: "1rem", textAlign: "center", flexShrink: 0 }}
				// variant="standard"
				value={adderValue || ""}
				InputProps={{
					style: { textAlign: "center" },
					readOnly: true,
					disabled: true,
				}}
			/>

			<TextField
				placeholder="Buscar"
				sx={{ flexGrow: 1 }}
				value={value}
				onChange={({ target: { value } }) => {
					onChange(value);
				}}
				onKeyDown={(event) => {
					// console.log(event.key);
					if (event.key === "Escape") onClear();
					if (event.key === "ArrowUp") moveSelected(-1);
					if (event.key === "ArrowDown") moveSelected(1);
					if (event.key === "Enter") onEnter();
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
}
