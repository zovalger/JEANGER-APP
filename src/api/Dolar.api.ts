import { PROXY } from "@/config";
import { DolarValue } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/dolar`;

// ***************** consultas	*****************

export const getDolarRequest = async (): Promise<DolarValue> =>
	(await axios.get(`${url}`)).data;
