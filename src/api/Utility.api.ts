import { PROXY } from "@/config";
import { Bill } from "@/types";

import axios from "axios";

const url = `${PROXY}/api/utility`;

// ***************** consultas	*****************

export const getGetCNE_CI_Request = async (ci: string): Promise<string> =>
	(await axios.get(`${url}/cne?ci=${ci}`)).data;
