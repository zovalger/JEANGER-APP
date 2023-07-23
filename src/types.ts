export interface propsWithChildren {
	children: any;
}

export enum CurrencyType {
	USD = "USD",
	BSF = "BSF",
}
export interface DolarValue {
	value: number;
	date: Date;
}

export interface Product {
	_id: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
}

export interface ProductReference {
	_id: string;
	parentId: string;
	childId: string;
	cost: number;
	currencyType: CurrencyType;
	percentage: number;
	amount: number;
}
