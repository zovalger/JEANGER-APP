import { PROXY } from "@/config";
import { ProductSettings } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/product_settings`;

// *******************************************************************
// 													Products settings
// *******************************************************************

// ***************** consultas	*****************

export const getProductSettingRequest = async (): Promise<ProductSettings> =>
	(await axios.get(`${url}/`)).data;

// ***************** modificaciones	*****************

export const updateProductRequest = async (
	data: ProductSettings
): Promise<ProductSettings> => (await axios.put(`${url}/`, data)).data;
