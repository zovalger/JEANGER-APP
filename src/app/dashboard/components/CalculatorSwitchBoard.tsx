import { CalculatorState } from "@/types";
import { Button, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";

interface CalculatorSwitchBoardProps {
	data: CalculatorState;
	// onChange(value: string): void;
	onInputNumberHanddle(value: string): void;
	onSpecialKeyDownHanddle(key: string, altKey: boolean, ctrlKey: boolean): void;
	switchCurrencyType(): void;
	deleteOneNumber(): void;
}

export default function CalculatorSwitchBoard({
	data,
	onInputNumberHanddle,
	onSpecialKeyDownHanddle,
	switchCurrencyType,
	deleteOneNumber,
}: CalculatorSwitchBoardProps) {
	const { b, currencyType } = data;

	const beforeValue = b != null ? b : "";

	const addNumber = (n: string) => onInputNumberHanddle(`${beforeValue}${n}`);

	const buttons = [
		{
			label: currencyType,
			onClick: () => switchCurrencyType(),
		},
		{
			label: "C",
			onClick: () => onSpecialKeyDownHanddle("Escape", false, false),
		},
		{
			label: "<-",
			onClick: () => deleteOneNumber(),
		},
		{ label: "/", onClick: () => onSpecialKeyDownHanddle("/", false, false) },
		{ label: 7, onClick: () => addNumber("7") },
		{ label: 8, onClick: () => addNumber("8") },
		{ label: 9, onClick: () => addNumber("9") },
		{ label: "*", onClick: () => onSpecialKeyDownHanddle("*", false, false) },
		{ label: 4, onClick: () => addNumber("4") },
		{ label: 5, onClick: () => addNumber("5") },
		{ label: 6, onClick: () => addNumber("6") },
		{ label: "-", onClick: () => onSpecialKeyDownHanddle("-", false, false) },
		{ label: 1, onClick: () => addNumber("1") },
		{ label: 2, onClick: () => addNumber("2") },
		{ label: 3, onClick: () => addNumber("3") },
		{ label: "+", onClick: () => onSpecialKeyDownHanddle("+", false, false) },
		{ label: 0, width: 9, onClick: () => addNumber("0") },
		{
			label: "=",
			onClick: () => onSpecialKeyDownHanddle("Enter", false, false),
		},
	];

	return (
		<Grid container spacing={1}>
			{buttons.map((item) => (
				<Grid item key={uuid()} xs={item.width !== undefined ? item.width : 3}>
					<Button fullWidth onClick={item.onClick} sx={{ fontSize: "1.4rem" }}>
						{item.label}
					</Button>
				</Grid>
			))}
		</Grid>
	);
}
