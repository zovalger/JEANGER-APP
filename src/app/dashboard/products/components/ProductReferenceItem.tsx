import Box from "@mui/material/Box";
import { Product, ProductReference } from "@/types";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { useProductContext } from "@/app/dashboard/products/context/Product.context";

interface props {
	data: ProductReference;
	onClick(): void;
}

export default function ProductReferenceItem({ data, onClick }: props) {
	const { productsIndexed } = useProductContext();

	const { parentId, percentage, amount } = data;
	return (
		<Box
			onClick={onClick}
			sx={{ display: "flex", justifyContent: "space-between" ,p:".5rem" }}
		>
			<Typography>{productsIndexed[parentId].name}</Typography>
			<Typography>{productsIndexed[parentId].cost}</Typography>
			<Typography>{productsIndexed[parentId].currencyType}</Typography>
			<Typography>{percentage}</Typography>
			<Typography>{amount}</Typography>
		</Box>
	);
}
