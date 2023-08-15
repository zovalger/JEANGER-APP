import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import { useState } from "react";

import { CalculatorState, CurrencyType, MathOperation } from "@/types";
import { calculateResult } from "./CalculatorHelper";
import CalculatorSwitchHistory from "./CalculatorSwitchHistory";
import CalculatorSwitchVisor from "./CalculatorSwitchVisor";
import CalculatorSwitchBoard from "./CalculatorSwitchBoard";
import { useGlobalContext } from "@/contexts/Global.context";

const initialState = {
	_id: uuid(),
	a: 0,
	b: null,
	result: null,
	mathOperation: MathOperation.sum,
	currencyType: CurrencyType.BSF,
};

export default function CalculatorSwitch() {
	const { dolar } = useGlobalContext();
	const [history, setHistory] = useState<CalculatorState[]>([]);
	const [dataCalculator, setDataCalculator] =
		useState<CalculatorState>(initialState);

	const saveCalculatorStateInList = (
		data: CalculatorState
	): CalculatorState[] => {
		const newList = [...history, data];
		setHistory(newList);
		return newList;
	};

	const resetDataCalculator = () => {
		setDataCalculator(initialState);
	};

	const calculateCurrentResult = (data: CalculatorState) => {
		const newState = calculateResult(data);
		saveCalculatorStateInList({ ...newState, _id: uuid() });
		setDataCalculator({ ...newState, _id: uuid() });
	};

	const calculateResultAndNext = (
		data: CalculatorState,
		key: MathOperation
	) => {
		const currentState = calculateResult(data);
		saveCalculatorStateInList(currentState);

		if (currentState.result === null) return;
		if (currentState.b === null) return;

		const newState: CalculatorState = {
			...currentState,
			_id: uuid(),
			a: currentState.result,
			mathOperation: key,
			b: null,
			result: null,
		};

		setDataCalculator(newState);
	};

	const switchCurrencyType = () => {
		const { a, b, result, currencyType } = dataCalculator;

		if (!dolar) return;

		const converter = (n: number) =>
			currencyType === CurrencyType.USD ? n * dolar.value : n / dolar.value;

		setDataCalculator({
			...dataCalculator,
			a: converter(a),
			b: b != null ? converter(b) : null,
			result: result != null ? converter(result) : null,
			currencyType:
				currencyType == CurrencyType.USD ? CurrencyType.BSF : CurrencyType.USD,
		});
	};

	const deleteOneNumber = () => {
		if (dataCalculator.b == null) return;

		const next = dataCalculator.b.toString().split("").slice(0, -1).join("");

		onInputNumberHanddle(next);
	};

	const onInputNumberHanddle = (value: string) => {
		const bValue = value ? parseFloat(value) : 0;

		setDataCalculator({ ...dataCalculator, b: bValue });
	};

	const onSpecialKeyDownHanddle = (
		key: string,
		altKey: boolean,
		ctrlKey: boolean
	) => {
		console.log(key, altKey, ctrlKey);

		if (
			key === MathOperation.sum ||
			key === MathOperation.subtract ||
			key === MathOperation.division ||
			key === MathOperation.multiply
		) {
			calculateResultAndNext(dataCalculator, key);
		} else if (key === "Enter") {
			calculateCurrentResult(dataCalculator);
		} else if (key === "Escape") {
			resetDataCalculator();
		}
	};

	return (
		<>
			{/* <Box>instancias</Box> */}
			<Box
				boxShadow={2}
				sx={{
					p: 1,
					bgcolor:
						dataCalculator.currencyType == CurrencyType.USD ? "#0f52" : "",
					borderRadius: "8px",
				}}
			>
				{/* historial */}
				<CalculatorSwitchHistory data={history} />
				<CalculatorSwitchVisor
					data={dataCalculator}
					onChange={onInputNumberHanddle}
					onKeyDown={onSpecialKeyDownHanddle}
				/>
				{/* teclado */}
				<CalculatorSwitchBoard
					data={dataCalculator}
					onInputNumberHanddle={onInputNumberHanddle}
					onSpecialKeyDownHanddle={onSpecialKeyDownHanddle}
					deleteOneNumber={deleteOneNumber}
					switchCurrencyType={switchCurrencyType}
				/>
			</Box>
		</>
	);
}