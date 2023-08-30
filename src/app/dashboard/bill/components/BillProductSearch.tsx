import { useEffect, useState } from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface props {
	value: string;
	onChange(value: string): void;
	onClear(): void;
	onEnter(): void;
	moveSelected(direction:number): void;
}
export default function BillProductSearch({
	value,
	onChange,
	onClear,
	onEnter,
	moveSelected,
}: props) {
	return (
		<Box sx={{ mb: "1rem" }}>
			<TextField
				id="input-with-icon-textfield"
				placeholder="Buscar"
				fullWidth
				value={value}
				onChange={({ target: { value } }) => {
					onChange(value);
				}}
				onKeyDown={(event) => {
					console.log(event.key);
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
