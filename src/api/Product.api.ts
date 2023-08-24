import { PROXY } from "@/config";
import { Product, ProductReference } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/product`;

// *******************************************************************
// 													Productos
// *******************************************************************

// ***************** consultas	*****************


export const getProductRequest = async (id: string): Promise<Product> =>
	(await axios.get(`${url}/${id}`)).data;
	
export const getAllProductsRequest = async (): Promise<Product[]> =>
	(await axios.get(`${url}`)).data;

// ***************** modificaciones	*****************

export const createProductRequest = async (data: Product): Promise<Product> =>
	(await axios.post(url, data)).data;

export const updateProductRequest = async (
	id: string,
	data: Product
): Promise<Product> => (await axios.put(`${url}/${id}`, data)).data;

export const deleteProductRequest = async (id: string): Promise<boolean> =>
	(await axios.delete(`${url}/${id}`)).data;

// *******************************************************************
// 													Referencias
// *******************************************************************

// ***************** consultas referencias	*****************

export const getProductsReferences_by_productChild_Request = async (
	productId: string
): Promise<ProductReference[]> =>
	(await axios.get(`${url}/${productId}/reference`)).data;

export const getPosibleProductParents_by_productId_Request = async (
	productId: string
): Promise<string[]> =>
	(await axios.get(`${url}/${productId}/reference/to_parent`)).data;


// ***************** modificaciones	 Referencias *****************

export const createUpdateProductsReference_Request = async (
	data: ProductReference
): Promise<ProductReference> =>
	(await axios.post(`${url}/reference/${data.parentId}/${data.childId}`, data))
		.data;

export const deleteProductsReference_Request = async (
	parentId: string,
	childId: string
): Promise<ProductReference> =>
	(await axios.delete(`${url}/reference/${parentId}/${childId}`)).data;
