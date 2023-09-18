import { PROXY } from "@/config";
import { Bill, saldoMovilnet } from "@/types";

import axios from "axios";

const url = `${PROXY}/api/utility`;

// ***************** consultas	*****************

export const getCNE_CI_Request = async (ci: string): Promise<string> =>
	(await axios.get(`${url}/cne?ci=${ci}`)).data;

export const getSaldoMovilnet_Request = async (
	phoneNumber: string
): Promise<saldoMovilnet> =>
	(await axios.get(`${url}/movilnet/?phoneNumber=${phoneNumber}`)).data;
