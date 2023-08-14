import { CalculatorState } from "@/types";

export const calculateResult = (data: CalculatorState): CalculatorState => {
	const result = eval(`${data.a}${data.mathOperation}${data.b}`);

	return { ...data, result };
};
