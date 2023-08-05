import { Stopwatch } from "@/types";

export const startTimer = (data: Stopwatch) => {
	const { timeDate: td, accumulatedTime: at, timeSeted: ts } = data;

	const timeDate =
		!td && !at ? Date.now() + ts : td ? td : at ? Date.now() + at : Date.now();
		
	const accumulatedTime = 0;

	return { ...data, accumulatedTime, timeDate };
};

export const pauseTimer = (data: Stopwatch) => {
	// arreglar cuando el tiempo esta negativo

	const { accumulatedTime: at, timeDate: td } = data;

	if (!td) return data;

	const accumulatedTime = at ? at : td - Date.now();

	const timeDate = null;

	return { ...data, accumulatedTime, timeDate };
};

export const getTimeTimer = (data: Stopwatch, referenceTime: number) => {
	const { timeDate, accumulatedTime } = data;

	return timeDate ? timeDate - referenceTime : accumulatedTime;
};
