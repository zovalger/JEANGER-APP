import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { CalculatorState, MathOperation } from "@/types";

interface CalculatorSwitchVisorProps {
	data: CalculatorState;
	onChange(value: string): void;
	onKeyDown(key: string, altKey: boolean, ctrlKey: boolean): void;
}

export default function CalculatorSwitchVisor({
	data,
	onChange,
	onKeyDown,
}: CalculatorSwitchVisorProps) {
	const { a, b, mathOperation, result, currencyType } = data;
	let valueVisor = b === null ? 0 : b;

	let textMiniVisor = ``;
	if (a == 0 && b == null && result == null) {
		textMiniVisor = "";
	} else if (a && b != null && !result) {
		textMiniVisor = `${a} ${mathOperation}`;
	} else if (a && b && result) {
		textMiniVisor = `${a} ${mathOperation} ${b} =`;
		valueVisor = result;
	}

	return (
		<Box sx={{ py: 1 }}>
			<Box sx={{ textAlign: "right" }}>{textMiniVisor}</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box sx={{ mr: "1rem" }}>{currencyType}</Box>
				<TextField
					name=""
					value={valueVisor}
					onChange={(event) => onChange(event.target.value)}
					onKeyDown={(event) => {
						if (
							event.key === MathOperation.sum ||
							event.key === MathOperation.subtract ||
							event.key === MathOperation.division ||
							event.key === MathOperation.multiply ||
							event.key === "Enter" ||
							event.key === "Escape"
						) {
							event.preventDefault();
							onKeyDown(event.key, event.altKey, event.ctrlKey);
						}
					}}
					autoComplete="none"
					variant="standard"
					inputProps={{
						style: {
							textAlign: "right",
							fontSize: "2rem",
						},
					}}
				/>
			</Box>
		</Box>
	);
}
