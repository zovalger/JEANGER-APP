import Box from "@mui/material/Box";
import { CurrencyType, Product } from "@/types";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";

import { useGlobalContext } from "@/contexts/Global.context";

interface props {
	data: Product;
	onClick(): void;
}

export default function ProductItem({ data, onClick }: props) {
	const { dolar } = useGlobalContext();

	const { name, cost, currencyType } = data;

	let d = dolar || { value: 0 };

	const BSF = currencyType == CurrencyType.BSF ? cost : cost * d.value;
	const USD = currencyType == CurrencyType.USD ? cost : cost / d.value;

	return (
		<Card
			variant="outlined"
			onClick={onClick}
			sx={{
				mb: "0.2rem",
				":hover": { transform: { scale: "99%" } },
			}}
		>
			<CardContent>
				<Grid>
					<Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
						<Typography>{name}</Typography>
					</Grid>

					<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
						<Typography component={"span"}>{USD.toFixed(2)}</Typography>
						<Typography component={"span"}>{CurrencyType.USD}</Typography>
					</Grid>

					<Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
						<Typography component={"span"}>{BSF.toFixed(2)}</Typography>
						<Typography component={"span"}>{CurrencyType.BSF}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
