import Box from "@mui/material/Box";
import { CurrencyType } from "@/types";
import { Card, Grid, Typography } from "@mui/material";

import { useGlobalContext } from "@/contexts/Global.context";
import { useProductContext } from "../../products/context/Product.context";

interface props {
	_id: string;
	index: number;
	selected: number;
	onClick(): void;
}

export default function BillProductItem({
	_id,
	index,
	selected,
	onClick,
}: props) {
	const { dolar } = useGlobalContext();
	const { productsIndexed } = useProductContext();

	const { name, cost, currencyType } = productsIndexed[_id];

	let d = dolar || { value: 0 };

	const BSF = currencyType == CurrencyType.BSF ? cost : cost * d.value;
	const USD = currencyType == CurrencyType.USD ? cost : cost / d.value;

	return (
		<Box
			onClick={onClick}
			sx={{
				width: "100%",
				mb: "0.2rem",
				p: 1,
				bgcolor: selected == index ? "#eee" : "",
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
							<Typography component={"span"}>{USD.toFixed(2)}</Typography>
							<Typography component={"span"} sx={{ ml: 1 }} color={"#0a6f"}>
								{CurrencyType.USD}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}