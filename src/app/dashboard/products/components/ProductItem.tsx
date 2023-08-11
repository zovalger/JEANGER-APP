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
				p: 1,
				":hover": { bgcolor: "#0001" },
			}}
		>
			{/* <CardContent> */}
			<Grid container spacing={2}>
				<Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
					<Typography>{name}</Typography>
				</Grid>

				<Grid item xs={3} sx={{ textAlign: "right" }}>
					<Typography component={"span"}>{BSF.toFixed(2)}</Typography>
					<Typography component={"span"} sx={{ ml: 1 }}>
						{CurrencyType.BSF}
					</Typography>
				</Grid>
				<Grid item xs={2} sx={{ textAlign: "right" }}>
					<Typography component={"span"}>{USD.toFixed(2)}</Typography>
					<Typography component={"span"} sx={{ ml: 1 }} color={"#0a6f"}>
						{CurrencyType.USD}
					</Typography>
				</Grid>
			</Grid>
			{/* </CardContent> */}
		</Card>
	);
}
