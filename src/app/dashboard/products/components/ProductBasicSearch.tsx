import { useEffect, useState } from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useProductContext } from "../context/Product.context";
import { searchProductsByWord } from "../helpers/Product.helpers";

export default function ProductBasicSearch() {
	const { products, inQuery, setInQuery, productsInQuery, setProductsInQuery } =
		useProductContext();

	useEffect(() => {
		return () => {
			setInQuery(false);
			setProductsInQuery([]);
		};
	}, []);

	// *******************************************************************
	// 													Formulario
	// *******************************************************************

	const [inputValue, setInputValue] = useState("");
	const onChange = (v: string) => {
		if (v) setInQuery(true);
		else setInQuery(false);

		const query = searchProductsByWord(v, products);

		setProductsInQuery(query);
		setInputValue(v);
	};

	const clearValue = () => {
		setInQuery(false);
		setProductsInQuery([]);
		setInputValue("");
	};
	return (
		<Box sx={{ mb: "1rem" }}>
			<TextField
				id="input-with-icon-textfield"
				placeholder="Buscar"
				fullWidth
				value={inputValue}
				onChange={({ target: { value } }) => {
					onChange(value);
				}}
				onKeyDown={(event) => {
					if (event.key === "Escape") clearValue();
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
