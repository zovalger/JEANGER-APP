"use client";

import { CurrencyType, Product, propsWithChildren } from "@/types";
import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

interface ContextProps {
	products: Product[];
	setProducts: Dispatch<SetStateAction<Product[]>>;
	productDataForm: Product | null;
	setProductDataForm: Dispatch<SetStateAction<Product | null>>;
	productsIndexed: any;
	setProductsIndexed: Dispatch<SetStateAction<any>>;
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
});

export const ProductContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los productos
	const [products, setProducts] = useState<Product[]>([
		{
			_id: "64bb273a372bae4f95fe99ba",
			name: "Bulto Harina",
			cost: 22,
			currencyType: CurrencyType.USD,
			keywords: ["harina", "pan", "harina pan"],
		},
		{
			_id: "64b6ffd95019b521c2aa01ee",
			name: "Harina",
			cost: 1.1,
			currencyType: CurrencyType.USD,
			keywords: ["harina", "pan", "pan pan"],
		},
	]);
	// productos indexados
	const [productsIndexed, setProductsIndexed] = useState<any>({});

	// Datos del formulario de productos
	const [productDataForm, setProductDataForm] = useState<Product | null>(null);

	return (
		<ProductContext.Provider
			value={{
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