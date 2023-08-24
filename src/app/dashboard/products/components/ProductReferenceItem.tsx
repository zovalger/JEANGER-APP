import Box from "@mui/material/Box";
import {  ProductReference } from "@/types";
import {

	Grid,
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
		<Grid
			container
			spacing={2}
			onClick={onClick}
			//sx={{ border: "1px solid black" }}
		>
			<Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
				<Typography>{productsIndexed[parentId].name}</Typography>
			</Grid>

			<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
				<Typography>
					{`${productsIndexed[parentId].cost.toFixed(2)} ${productsIndexed[parentId].currencyType}`}
				</Typography>
			</Grid>
			<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
				<Typography>{percentage}</Typography>
			</Grid>
			<Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
				<Typography>{amount}</Typography>
			</Grid>
		</Grid>
	);
}
