import { Stopwatch } from "@/types";

export const startStopwatch = (data: Stopwatch) => {
	const { accumulatedTime: at, timeDate: td } = data;

	const timeDate = td ? td : at ? Date.now() - at : Date.now();
	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate };
};

export const pauseStopwatch = (data: Stopwatch) => {
	// arreglar cuando el tiempo esta negativo

	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : Date.now() - td;

	const timeDate = null;

	return { ...data, accumulatedTime, timeDate };
};

export const getTimeStopwatch = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? referenceTime - timeDate : accumulatedTime;
};
