import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import { useState } from "react";

import { CalculatorState, CurrencyType, MathOperation } from "@/types";
import { calculateResult } from "./CalculatorHelper";
import CalculatorSwitchHistory from "./CalculatorSwitchHistory";
import CalculatorSwitchVisor from "./CalculatorSwitchVisor";
import CalculatorSwitchBoard from "./CalculatorSwitchBoard";

const initialState = {
	_id: uuid(),
	a: 0,
	b: null,
	result: null,
	mathOperation: MathOperation.sum,
	currencyType: CurrencyType.BSF,
};

export default function CalculatorSwitch() {
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

	const calculateResultAndNext = (data: CalculatorState) => {
		const currentState = calculateResult(data);
		saveCalculatorStateInList(currentState);

		if (currentState.result === null) return;
		if (currentState.b === null) return;

		const newState = {
			...currentState,
			_id: uuid(),
			a: currentState.result,
			b: null,
			result: null,
		};

		setDataCalculator(newState);
	};

	const onChangeHanddle = (value: string) => {
		const bValue = value ? parseFloat(value) : 0;

		setDataCalculator({ ...dataCalculator, b: bValue });
	};

	const onKeyDownHanddle = (key: string, altKey: boolean, ctrlKey: boolean) => {
		console.log(key, altKey, ctrlKey);

		if (
			key === MathOperation.sum ||
			key === MathOperation.subtract ||
			key === MathOperation.division ||
			key === MathOperation.multiply
		) {
			calculateResultAndNext({ ...dataCalculator, mathOperation: key });
		} else if (key === "Enter") {
			calculateCurrentResult(dataCalculator);
		} else if (key === "Escape") {
			resetDataCalculator();
		}
	};

	return (
		<>
			<Box>instancias</Box>
			<Box
				boxShadow={2}
				sx={{
					p: 1,
					borderRadius: "8px",
				}}
			>
				{/* historial */}
				<CalculatorSwitchHistory data={history} />
				<CalculatorSwitchVisor
					data={dataCalculator}
					onChange={onChangeHanddle}
					onKeyDown={onKeyDownHanddle}
				/>
				{/* teclado */}
				<CalculatorSwitchBoard />
			</Box>
		</>
	);
}
