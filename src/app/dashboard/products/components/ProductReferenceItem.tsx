import Box from "@mui/material/Box";
import { Product, ProductReference } from "@/types";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { useProductContext } from "@/contexts/Product.context";

interface props {
	data: ProductReference;
	onClick(): void;
}

export default function ProductReferenceItem({ data, onClick }: props) {
	const { productsIndexed } = useProductContext();

	const { parentId, percentage, amount } = data;
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
			<CardContent onClick={onClick} sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>{productsIndexed[parentId]}</Typography>
			</CardContent>
		</Card>
	);
}
