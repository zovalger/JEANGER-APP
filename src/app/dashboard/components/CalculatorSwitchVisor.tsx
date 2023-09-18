import { MathOperation } from "@/enums";
import { CalculatorState } from "@/types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface CalculatorSwitchVisorProps {
	data: CalculatorState;
	dataVisor: string;
	onChange(value: string): void;
	onKeyDown(key: string, altKey: boolean, ctrlKey: boolean): void;
}

export default function CalculatorSwitchVisor({
	data,
	dataVisor,
	onChange,
	onKeyDown,
}: CalculatorSwitchVisorProps) {
	const { a, b, mathOperation, result, currencyType } = data;

	let textMiniVisor = ``;
	if (a == 0 && b == null && result == null) {
		textMiniVisor = "";
	} else if (a && !result) {
		textMiniVisor = `${a.toFixed(2)} ${mathOperation}`;
	} else if (a && b && result) {
		textMiniVisor = `${a.toFixed(2)} ${mathOperation} ${b.toFixed(2)} =`;
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
				<Box sx={{ mx: "1rem", fontSize:"1.2rem" }}>
					<strong>{currencyType}</strong>
				</Box>
				<TextField
					name=""
					value={dataVisor}
					onChange={(event) => onChange(event.target.value)}
					onKeyDown={(event) => {
						if (
							event.key === MathOperation.sum ||
							event.key === MathOperation.subtract ||
							event.key === MathOperation.division ||
							event.key === MathOperation.multiply ||
							event.key === "Enter" ||
							event.key === "Escape" ||
							event.key === "$"
						) {
							event.preventDefault();
							onKeyDown(event.key, event.altKey, event.ctrlKey);
						}
					}}
					autoComplete="none"
					variant="standard"
					fullWidth
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
