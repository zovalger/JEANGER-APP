"use client";

import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useProductContext } from "@/app/dashboard/products/context/Product.context";
import ProductItem from "./components/ProductItem";
import ProductForm, {
	initialValuesProductDataForm,
} from "./components/ProductForm";
import { useGlobalContext } from "@/contexts/Global.context";
import { Product } from "@/types";
import ProductBasicSearch from "./components/ProductBasicSearch";
import PageTemplate from "@/app/components/PageTemplate";

export default function ProductPage() {
	const {
		products,
		inQuery,
		productsInQuery,
		setProductDataForm,
		refreshProducts,
		productsIndexed,
	} = useProductContext();

	const [openProductForm, setOpenProductForm] = useState<boolean>(false);

	const showLimitedProducts = (arr: Product[]) => {
		const limited = arr.slice(0, 15);

		return limited.map(({ _id }) => (
			<ProductItem
				key={_id}
				_id={_id}
				onClick={() => {
					setOpenProductForm(true);
					setProductDataForm(productsIndexed[_id]);
				}}
			/>
		));
	};

	return (
		<PageTemplate
			nameNavBar="Productos"
			rightIcons={
				<>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={async () => {
							try {
								await refreshProducts();
							} catch (error) {
								console.log(error);
							}
						}}
						// sx={{ mr: 2}}
					>
						<RefreshIcon />
					</IconButton>

					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="end"
						onClick={() => {
							setProductDataForm(initialValuesProductDataForm);
							setOpenProductForm(true);
						}}
						// sx={{ mr: 2}}
					>
						<AddIcon />
					</IconButton>
				</>
			}
		>
			<ProductBasicSearch />

			{!inQuery
				? showLimitedProducts(products)
				: showLimitedProducts(productsInQuery)}

			{openProductForm && <ProductForm setOpen={setOpenProductForm} />}
		</PageTemplate>
	);
}
