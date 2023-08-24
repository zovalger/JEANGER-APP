import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Divider, Typography } from "@mui/material";
import { useProductContext } from "../context/Product.context";

export default function ProductFromKeywordStack() {
	const { allKeywords, productDataForm, setProductDataForm } =
		useProductContext();

	const [keyword, setKeyword] = useState("");
	const [keywordInput, setKeywordInput] = useState("");

	const onAddKeyword = () => {
		if (!productDataForm) return;
		if (!keywordInput) return;

		const newKeywords = [...productDataForm.keywords, keywordInput];
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
							key={k}
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
					onAddKeyword();
				}}
				inputValue={keywordInput}
				onKeyDown={(e) => {
					if (e.key === "Enter") onAddKeyword();
				}}
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
