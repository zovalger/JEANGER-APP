import { PROXY } from "@/config";
import { Product, ProductReference } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/product`;

// ***************** consultas	*****************

export const getAllProductsRequest = async (): Promise<Product[]> =>
	(await axios.get(`${url}`)).data;

export const getProductsToParentRequest = async (): Promise<Product[]> =>
	(await axios.get(`${url}`)).data;

export const getProductsReferences_by_productChild_Request = async (
	productId: string
): Promise<ProductReference[]> =>
	(await axios.get(`${url}/${productId}/reference`)).data;

export const getPosibleProductParents_by_productId_Request = async (
	productId: string
): Promise<string[]> =>
	(await axios.get(`${url}/${productId}/reference/to_parent`)).data;

export const getProductRequest = async (id: string): Promise<Product> =>
	(await axios.get(`${url}/${id}`)).data;

// ***************** modificaciones	*****************

export const createProductRequest = async (data: Product): Promise<Product> =>
	(await axios.post(url, data)).data;

export const updateProductRequest = async (
	id: string,
	data: Product
): Promise<Product> => (await axios.put(`${url}/${id}`, data)).data;

export const deleteProductRequest = async (id: string) =>
	(await axios.delete(`${url}/${id}`)).data;
