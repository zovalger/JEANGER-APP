import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import { useState } from "react";

import { CurrencyType } from "@/types";
import { Button, Grid } from "@mui/material";

enum MathOperation {
	sum = "+",
	subtract = "-",
	division = "/",
	multiply = "*",
}

interface CalculatorState {
	_id: string;
	a: number;
	b: number | null;
	mathOperation: MathOperation;
	result?: number;
	currencyType: CurrencyType;
}

const calculatorState: CalculatorState[] = [
	{
		_id: uuid(),
		a: 3,
		b: 5,
		mathOperation: MathOperation.sum,
		currencyType: CurrencyType.USD,
	},
	{
		_id: uuid(),
		a: 23,
		b: 94,
		mathOperation: MathOperation.subtract,
		currencyType: CurrencyType.USD,
	},
	{
		_id: uuid(),
		a: 33,
		b: 7,
		mathOperation: MathOperation.division,
		currencyType: CurrencyType.BSF,
	},
	{
		_id: uuid(),
		a: 66,
		b: 33,
		mathOperation: MathOperation.multiply,
		currencyType: CurrencyType.BSF,
	},
	{
		_id: uuid(),
		a: 3,
		b: 2,
		mathOperation: MathOperation.sum,
		currencyType: CurrencyType.BSF,
	},
	{
		_id: uuid(),
		a: 23,
		b: 94,
		mathOperation: MathOperation.sum,
		currencyType: CurrencyType.USD,
	},
];

function CalculatorSwitchHistory({ data }: { data: CalculatorState[] }) {
	return (
		<Box
			sx={{
				maxHeight: "7rem",
				overflow: "hidden",
				overflowY: "scroll",
				boxShadow: "inset 0px 0px 5px #0002",
				border: "1px solid #0002",
				borderRadius: "8px",
			}}
		>
			{data.map((item) => (
				<Box
					key={item._id}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
						p: 0.2,
						px: 1,
						borderRadius: "8px",
						":hover": {
							bgcolor: "#0001",
						},
					}}
				>
					<Box>{item.currencyType}</Box>
					<Box>
						<Box
							component={"span"}
						>{`${item.a} ${item.mathOperation} ${item.b}`}</Box>
						<Box component={"span"}>={`${item.result || "xx"}`}</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
}

function CalculatorSwitchVisor({ data }: { data: CalculatorState }) {
	const { a, b, mathOperation, result, currencyType } = data;

	return (
		<Box sx={{ py: 1 }}>
			<Box sx={{ textAlign: "right" }}>{`${a} ${mathOperation} ${b} =`}</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box sx={{ mr: "1rem" }}>{currencyType}</Box>
				<TextField
					variant="standard"
					onKeyDown={() => {}}
					inputProps={{
						style: {
							textAlign: "right",
							fontSize: "2rem",
						},
					}}
					name=""
					value={b}
				/>
			</Box>
		</Box>
	);
}

function CalculatorSwitchBoard() {
	const buttons = [
		{ label: 7, onClick: () => {} },
		{ label: 8, onClick: () => {} },
		{ label: 9, onClick: () => {} },
		{ label: "/", onClick: () => {} },
		{ label: 4, onClick: () => {} },
		{ label: 5, onClick: () => {} },
		{ label: 6, onClick: () => {} },
		{ label: "*", onClick: () => {} },
		{ label: 1, onClick: () => {} },
		{ label: 2, onClick: () => {} },
		{ label: 3, onClick: () => {} },
		{ label: "-", onClick: () => {} },
    { label: "C", onClick: () => {} },
		{ label: 0, onClick: () => {} },
		{ label: "=", onClick: () => {} },
		{ label: "+", onClick: () => {} },
	];

	return (
		<Grid container spacing={1}>
			{buttons.map((item) => (
				<Grid item key={uuid()}>
					<Button>{item.label}</Button>
				</Grid>
			))}
		</Grid>
	);
}

export default function CalculatorSwitch() {
	const [data, setData] = useState(calculatorState[0]);

	return (
		<>
			<Box>instancias</Box>
			<Box
				boxShadow={2}
				sx={{
					p: 1,
				}}
			>
				{/* historial */}
				<CalculatorSwitchHistory data={calculatorState} />
				<CalculatorSwitchVisor data={data} />
				{/* teclado */}
				<CalculatorSwitchBoard />
			</Box>
		</>
	);
}
