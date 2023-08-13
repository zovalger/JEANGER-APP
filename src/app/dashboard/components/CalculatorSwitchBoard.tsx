import { Button, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";

export default function CalculatorSwitchBoard() {
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
				<Grid item key={uuid()} xs={3}>
					<Button fullWidth>{item.label}</Button>
				</Grid>
			))}
		</Grid>
	);
}
