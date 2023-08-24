import { Product } from "@/types";

export const getAllKeywordsProducts = (products: Product[]): string[] => {
	const flatKeywords = products.flatMap((product) => product.keywords);
	const uniqueKeywords: string[] = [];

	flatKeywords.map((k) => {
		if (!uniqueKeywords.includes(k)) uniqueKeywords.push(k);
	});

	return uniqueKeywords;
};
