import { PROXY } from "@/config";
import { Bill } from "@/types";

import axios from "axios";

const url = `${PROXY}/api/bill`;


// ***************** consultas	*****************


export const getAllBillsRequest = async (): Promise<Bill[]> =>
	(await axios.get(`${url}`)).data;