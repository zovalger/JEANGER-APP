import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { v4 as uuid } from "uuid";
import { Typography } from "@mui/material";
import { useProductContext } from "../context/Product.context";

export default function ProductFromKeywordStack() {
	const { allKeywords, productDataForm, setProductDataForm } =
		useProductContext();

	const [keyword, setKeyword] = useState("");
	const [keywordInput, setKeywordInput] = useState("");

	const onAddKeyword = () => {
		const value = keywordInput.trim();

		if (!value) return;
		if (!productDataForm) return;
		if (productDataForm.keywords.includes(value)) return;

		const newKeywords = [...productDataForm.keywords, value];
		setProductDataForm({ ...productDataForm, keywords: newKeywords });

		setKeyword("");
		setKeywordInput("");
	};

	const onDeleteKeyword = (keyword: string) => {
		if (!productDataForm) return;

		const { keywords } = productDataForm;

		const newKeywords = keywords.filter((k) => k !== keyword);

		setProductDataForm({ ...productDataForm, keywords: newKeywords });
	};

	if (!productDataForm) return;

	return (
		<>
			<Box sx={{ my: 1 }}>
				<Box sx={{ display: "flex", my: 1 }}>
					<Typography>Palabras Clave</Typography>
				</Box>

				<Box sx={{ display: "flex", flexWrap: "wrap" }}>
					{productDataForm.keywords.map((k) => (
						<Chip
							key={uuid()}
							label={k}
							variant="outlined"
							onDelete={() => onDeleteKeyword(k)}
						/>
					))}
				</Box>
			</Box>

			<Autocomplete
				value={keyword}
				onChange={(event: any, newValue: string | null) => {
					setKeyword(newValue || "");
					//onAddKeyword();
				}}
				inputValue={keywordInput}
				onKeyDown={(e) => {
					if (e.key === "Enter") onAddKeyword();
				}}
				onBlur={() => onAddKeyword()}
				onInputChange={(event, newInputValue) => setKeywordInput(newInputValue)}
				id="controllable-states-demo"
				options={allKeywords}
				renderInput={(params) => (
					<TextField {...params} label="Palabras clave" />
				)}
				fullWidth
			/>
		</>
	);
}
