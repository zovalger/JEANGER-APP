import { Product, ProductReference, ProductReferenceManipulate } from "@/types";
import { v4 as uuid } from "uuid";

// obtener una lista de palabras clave sin repeticiones
export const getAllKeywordsProducts = (products: Product[]): string[] => {
	const flatKeywords = products.flatMap((product) => product.keywords);
	const uniqueKeywords: string[] = [];

	flatKeywords.map((k) => {
		if (!uniqueKeywords.includes(k.trim())) uniqueKeywords.push(k.trim());
	});

	return uniqueKeywords;
};

// anadir una referencia y actualizar los demas arreglos
export const addInReferenceManipulate = (
	formData: ProductReference,
	proReManipulate: ProductReferenceManipulate
): ProductReferenceManipulate => {
	const { toAdd, toDelete, posibleParents, current } = proReManipulate;

	const data = !formData._id ? { ...formData, _id: uuid() } : formData;

	const toA = !toAdd.includes(data.parentId)
		? [...toAdd, data.parentId]
		: toAdd;

	const toD = toDelete.includes(data.parentId)
		? toDelete.filter((parentId) => parentId != data.parentId)
		: toDelete;

	const currIndex = current.findIndex(
		(item) => item.parentId === data.parentId
	);

	const curr =
		currIndex >= 0
			? current.map((item) => (item.parentId === data.parentId ? data : item))
			: [...current, data];

	const posParent = posibleParents.filter((item) => item != data.parentId);

	return {
		...proReManipulate,
		toAdd: toA,
		toDelete: toD,
		current: curr,
		posibleParents: posParent,
	};
};

// eliminar una referencia y actualizar los demas arreglos
export const deleteInReferenceManipulate = (
	formData: ProductReference,
	proReManipulate: ProductReferenceManipulate
) => {
	const data = formData;

	const { toAdd, current, toDelete, posibleParents } = proReManipulate;

	// eliminar de toAdd
	const toA = toAdd.filter((_id) => _id != data.parentId);

	// eliminar de current
	const curr = current.filter((item) => item.parentId != data.parentId);

	// añadir a toDelete
	const toD = !toDelete.includes(data.parentId)
		? [...toDelete, data.parentId]
		: toDelete;

	// añadir a posibleParent
	const posParent = !posibleParents.includes(data.parentId)
		? [...posibleParents, data.parentId]
		: posibleParents;

	return {
		...proReManipulate,
		toAdd: toA,
		toDelete: toD,
		current: curr,
		posibleParents: posParent,
	};
};

export function searchProductsByWord(
	query: string,
	products: Product[]
): Product[] {
	const reg = new RegExp(`${query}`, "i");

	const resultProducts = products.filter((item) => {
		const resultName = reg.test(item.name);
		const resultKeywords = item.keywords.find((i) => reg.test(i));

		return resultName || resultKeywords;
	});

	return resultProducts;
}