import { Box } from "@mui/material";
import BillProductSearch from "./BillProductSearch";
import BillProductSelector from "./BillProductSelector";
import { useState, useEffect } from "react";
import { BillItem, Product } from "@/types";
import { searchProductIdsByWord } from "../../products/helpers/Product.helpers";
import { useProductContext } from "../../products/context/Product.context";
import { useBillContext } from "../context/Bill.context";
import BillProductVisor from "./BillProductVisor";
import { updateBillItem } from "../helpers/Bill.helpers";

const regExpAdder = /^(\+|\-)\d{1,}/i;

export default function BillAdder() {
	const { products } = useProductContext();
	const { currentBill, setCurrentBill } = useBillContext();

	const [inputValue, setInputValue] = useState("");
	const [adderValue, setAdderValue] = useState<null | number>(null);
	const [productList, setProductList] = useState<string[]>([]);

	const [selected, setSelected] = useState<number>(-1);

	// *******************************************************************
	// 													Fuctions
	// *******************************************************************

	const refreshShowList = (search: string) => {
		const sanitizedQuery = search.replace(/(^(\+|\-)\d{1,})|(^(\+|\-))/, "");

		if (sanitizedQuery.length < 5) {
			setProductList([]);
			setSelected(-1);
			return;
		}

		const productsIds = searchProductIdsByWord(sanitizedQuery, products);
		setProductList(productsIds);
	};

	useEffect(() => {
		refreshShowList(inputValue);
	}, [inputValue]);

	// *******************************************************************
	// 													controls
	// *******************************************************************

	const onChange = (value: string) => setInputValue(value);

	const moveSelected = (direction: number) => {
		const brutePos = selected + direction;

		const newPos =
			brutePos < 0
				? productList.length
				: brutePos > productList.length - 1
				? 0
				: brutePos;

		setSelected(newPos);
	};

	const onEnter = () => {
		const matching = inputValue.match(regExpAdder);

		let newInputText = inputValue;
		let quantity = adderValue || 1;

		if (adderValue == null && matching) {
			quantity = parseInt(matching[0]);
			newInputText = inputValue.replace(regExpAdder, "");
		}

		if (selected > -1) {
			const newItemBill: BillItem = {
				productId: productList[selected],
				quantity,
			};

			const newBill = updateBillItem(currentBill, newItemBill);

			console.log(newBill.items);

			setCurrentBill(newBill);

			quantity = 0;
			newInputText = "";
		}

		//todo: añadir a la lista

		setAdderValue(quantity || null);
		setInputValue(newInputText);
		setSelected(-1);
	};

	const onClear = () => {
		setInputValue("");
		setAdderValue(null);
		setSelected(-1);
	};

	// *******************************************************************
	// 													Render
	// *******************************************************************

	return (
		<Box>
			<BillProductSearch
				value={inputValue}
				adderValue={adderValue}
				onChange={onChange}
				onClear={onClear}
				onEnter={onEnter}
				moveSelected={moveSelected}
			/>

			<BillProductSelector productIdList={productList} selected={selected} />

			<BillProductVisor />
		</Box>
	);
}
