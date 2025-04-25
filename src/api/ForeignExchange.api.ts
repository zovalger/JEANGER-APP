import { PROXY } from "@/config";
import { ForeignExchange } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/foreign_exchange`;

// ***************** consultas	*****************

export const getForeignExchangeRequest = async (): Promise<ForeignExchange> =>
	(await axios.get(`${url}`)).data;

export const setForeignExchangeRequest = async (
	data: Omit<ForeignExchange, "bankBusinessDate">
): Promise<ForeignExchange> => (await axios.post(`${url}`, data)).data;

// export const getDolarRequest = async (): Promise<DolarValue> => ({
// 	value: 31.5251,
// 	date: new Date(),
// });
