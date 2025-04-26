import { Card, Grid, Typography } from "@mui/material";

import { useGlobalContext } from "@/contexts/Global.context";
import { useProductContext } from "../context/Product.context";
import { CurrencyType } from "@/enums";
import { initialValuesForeignExchange } from "@/config/initialValues";

interface props {
	_id: string;
	onClick(): void;
}

export default function ProductItem({ _id, onClick }: props) {
	const { foreignExchange } = useGlobalContext();
	const { productsIndexed } = useProductContext();

	const { name, cost, currencyType } = productsIndexed[_id];

	let d = foreignExchange || initialValuesForeignExchange;

	// colocar monto en dolares siempre

	const divisaRef =
		currencyType == CurrencyType.BSF || currencyType == CurrencyType.USD
			? d.dolar
			: d.euro;

	// costo bolivares
	const BSF = currencyType == CurrencyType.BSF ? cost : cost * divisaRef;

	// costo en divisa
	const divisaCost = currencyType == CurrencyType.BSF ? cost / divisaRef : cost;

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
			<Grid container spacing={2} alignItems={"center"}>
				<Grid item xs={8} sm={6} md={8} lg={8} xl={8}>
					<Typography>{name}</Typography>
				</Grid>

				<Grid item xs={4} sm={6} md={4} lg={4} xl={4}>
					<Grid container columnSpacing={2}>
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={6}
							xl={6}
							sx={{ textAlign: "right" }}
						>
							<Typography component={"span"}>{BSF.toFixed(2)}</Typography>
							<Typography component={"span"} sx={{ ml: 1 }}>
								{CurrencyType.BSF}
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={6}
							xl={6}
							sx={{ textAlign: "right" }}
						>
							<Typography component={"span"}>
								{divisaCost.toFixed(2)}
							</Typography>
							<Typography
								component={"span"}
								sx={{ ml: 1 }}
								color={currencyType == CurrencyType.EUR ? "#f80" : "#0a6f"}
							>
								{currencyType == CurrencyType.EUR
									? CurrencyType.EUR
									: CurrencyType.USD}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{/* </CardContent> */}
		</Card>
	);
}
