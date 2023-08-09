"use client";

import { getAllProductsRequest } from "@/api/Product.api";
import { CurrencyType, Product, propsWithChildren } from "@/types";
import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";

interface ContextProps {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
	productDataForm: Product | null;
	setProductDataForm: Dispatch<SetStateAction<Product | null>>;
	productsIndexed: productsIndexed;
	setProductsIndexed: Dispatch<SetStateAction<any>>;
	refreshProducts(): Promise<void>;
}

interface productsIndexed {
	[productId: string]: Product;
}

const ProductContext = createContext<ContextProps>({
	products: [],
	setProducts: (): Product[] => [],
	productDataForm: null,
	setProductDataForm: (): Product | null => ({
		_id: "string",
		name: "string",
		cost: 0,
		currencyType: CurrencyType.USD,
		keywords: ["string"],
	}),

	productsIndexed: {},
	setProductsIndexed: (): any => ({}),
	refreshProducts: (): Promise<void> => new Promise(() => {}),
});

export const ProductContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los productos
	const [products, setProducts] = useState<Product[]>([]);
	// productos indexados
	const [productsIndexed, setProductsIndexed] = useState<productsIndexed>({});

	useEffect(() => {
		refreshProducts();
	}, []);

	const refreshProducts = async () => {
		try {
			const p = await getAllProductsRequest();
			setDataAndIndexate(p);
		} catch (error) {}
	};

	const setDataAndIndexate = (data: Product[]) => {
		setProducts(data);
		const indexed: any = {};

		data.map((p) => (indexed[p._id] = p));

		setProductsIndexed({ ...productsIndexed, ...indexed });
	};

	// Datos del formulario de productos
	const [productDataForm, setProductDataForm] = useState<Product | null>(null);

	return (
		<ProductContext.Provider
			value={{
				refreshProducts,
				
				products,
				setProducts,
				productDataForm,
				setProductDataForm,
				productsIndexed,
				setProductsIndexed,
			}}
		>
			{children}

		</ProductContext.Provider>
	);
};

export const useProductContext = () => useContext(ProductContext);
