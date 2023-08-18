import { CalculatorState } from "@/types";

export const calculateResult = (data: CalculatorState): CalculatorState => {
	const result = eval(`${data.a}${data.mathOperation}${data.b}`);

	return { ...data, result };
};

export const getVisorDataFormated = (data: CalculatorState): string => {
	const { a, b, result } = data;

	let valueVisor = b === null ? "0" : b.toFixed(2).toString();

	if (a && b && result) {
		valueVisor = result.toFixed(2).toString();
	}

	return valueVisor;
};

export const getNumberByVisorData = (dataVisor: string): number => {
	const bFormated = dataVisor.trim().replaceAll(",", ".");

	const bValue = bFormated ? parseFloat(bFormated) : 0;

	return bValue;
};
