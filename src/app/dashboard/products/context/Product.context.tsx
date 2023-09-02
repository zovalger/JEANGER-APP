"use client";

import { getAllProductsRequest } from "@/api/Product.api";
import {
	CurrencyType,
	Product,
	ProductReference,
	ProductReferenceManipulate,
	initialValuesProductReferenceManipulate,
	propsWithChildren,
} from "@/types";
import {
	createContext,
	useContext,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
} from "react";
import { getAllKeywordsProducts } from "../helpers/Product.helpers";
import { BlobOptions } from "buffer";

interface ContextProps {
	products: Product[];

	setProducts: Dispatch<SetStateAction<Product[]>>;

	allKeywords: string[];

	inQuery: boolean;
	setInQuery: Dispatch<SetStateAction<boolean>>;

	productsInQuery: Product[];
	setProductsInQuery: Dispatch<SetStateAction<Product[]>>;

	productsIndexed: productsIndexed;
	setProductsIndexed: Dispatch<SetStateAction<SetStateAction<any>>>;
	refreshProducts(): Promise<void>;

	productDataForm: Product | null;
	setProductDataForm: Dispatch<SetStateAction<Product | null>>;

	productReferenceManipulate: ProductReferenceManipulate;
	setProductReferenceManipulate: Dispatch<
		SetStateAction<ProductReferenceManipulate>
	>;
}

interface productsIndexed {
	[productId: string]: Product;
}

const ProductContext = createContext<ContextProps>({
	products: [],
	setProducts: (): Product[] => [],

	allKeywords: [],

	inQuery: false,
	setInQuery: (): boolean => false,

	productsInQuery: [],
	setProductsInQuery: (): Product[] => [],

	productsIndexed: {},
	setProductsIndexed: (): any => ({}),
	refreshProducts: (): Promise<void> => new Promise(() => {}),

	productDataForm: null,
	setProductDataForm: (): Product | null => ({
		_id: "string",
		name: "string",
		cost: 0,
		currencyType: CurrencyType.USD,
		keywords: ["string"],
		priority: 0,
	}),

	productReferenceManipulate: initialValuesProductReferenceManipulate,
	setProductReferenceManipulate: (): ProductReferenceManipulate =>
		initialValuesProductReferenceManipulate,
});

export const ProductContextProvider = ({ children }: propsWithChildren) => {
	// lista de todos los productos
	const [products, setProducts] = useState<Product[]>([]);
	// productos indexados
	const [productsIndexed, setProductsIndexed] = useState<productsIndexed>({});
	const [allKeywords, setAllKeywords] = useState<string[]>([]);

	const [inQuery, setInQuery] = useState(false);
	const [productsInQuery, setProductsInQuery] = useState<Product[]>([]);

	useEffect(() => {
		refreshProducts();
	}, []);

	const refreshProducts = async () => {
		try {
			const p = await getAllProductsRequest();
			const keywords = getAllKeywordsProducts(p);

			console.log(keywords);
			setAllKeywords(keywords);

			setDataAndIndexate(p);
		} catch (error) {}
	};

	const setDataAndIndexate = (data: Product[]) => {
		setProducts(data);
		const indexed: any = {};

		data.map((p) => (indexed[p._id] = p));

		setProductsIndexed({ ...productsIndexed, ...indexed });
	};

	// *************************************************************************
	// 										Datos del formulario de productos
	// 		aqui se guardaran los datos para la adicion o edicion de productos
	// *************************************************************************

	const [productDataForm, setProductDataForm] = useState<Product | null>(null);

	const [productReferenceManipulate, setProductReferenceManipulate] =
		useState<ProductReferenceManipulate>(
			initialValuesProductReferenceManipulate
		);

	return (
		<ProductContext.Provider
			value={{
				products,
				setProducts,
				allKeywords,

				inQuery,
				setInQuery,

				productsInQuery,
				setProductsInQuery,

				refreshProducts,

				productsIndexed,
				setProductsIndexed,

				productDataForm,
				setProductDataForm,
				productReferenceManipulate,
				setProductReferenceManipulate,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => useContext(ProductContext);
