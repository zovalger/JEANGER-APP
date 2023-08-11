import { PROXY } from "@/config";
import {Stopwatch } from "@/types";
import axios from "axios";

const url = `${PROXY}/api/stopwatch`;

// ***************** consultas	*****************

export const getAllStopwatchRequest = async (): Promise<Stopwatch[]> =>
	(await axios.get(`${url}`)).data;
