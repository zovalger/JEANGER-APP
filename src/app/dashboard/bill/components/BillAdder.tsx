import { Box } from "@mui/material";
import BillProductSearch from "./BillProductSearch";
import BillProductSelector from "./BillProductSelector";
import { useState, useEffect } from "react";

export default function BillAdder() {
	const [inputValue, setInputValue] = useState("");

	const onChange = (value: string) => {};
	const onClear = () => {
  };
	const onEnter = () => {};
	const onEspace = () => {};

	return (
		<Box>
			<BillProductSearch
				value={inputValue}
				onChange={onChange}
				onClear={onClear}
				onEnter={onEnter}
				onEspace={onEspace}
			/>

			<BillProductSelector />
		</Box>
	);
}
