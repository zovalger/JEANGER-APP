import Box from "@mui/material/Box";
import { Product } from "@/types";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";

interface props {
	data: Product;
	onClick(): void;
}

export default function ProductItem({ data, onClick }: props) {
	const { name, cost, currencyType } = data;
	return (
		<Card
			variant="outlined"
			onClick={onClick}
			sx={{
				minWidth: 275,
				mb: "0.2rem",
				":hover": { transform: { scale: "99%" } },
			}}
		>
			<CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>{name}</Typography>
				<Box sx={{ display: "flex" }}>
					<Typography sx={{ mr: "1rem" }}>{cost.toFixed(2)}</Typography>
					<Typography>{currencyType}</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
