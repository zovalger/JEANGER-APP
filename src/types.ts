import { type } from "os";

export interface propsWithChildren {
	children: any;
}

// ****************************************************************************
// 										          productos
// ****************************************************************************

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

// ****************************************************************************
// 										          Referencias de Productos
// ****************************************************************************

export interface ProductReference {
	_id: string;
	parentId: string;
	childId: string;
	cost: number;
	currencyType: CurrencyType;
	percentage: number;
	amount: number;
}

export interface ProductReferenceManipulate {
	toAdd: string[];
	current: ProductReference[];
	toDelete: string[];
	editing: ProductReference | null;
	posibleParents: string[];
}

export const initialValuesProductReferenceManipulate = {
	toAdd: [],
	current: [],
	toDelete: [],
	editing: null,
	posibleParents: [],
};

export interface ProductReferenceForm extends Omit<ProductReference, "_id"> {
	_id?: string;
}

// ****************************************************************************
// 										          Cronometros
// ****************************************************************************

export interface Stopwatch {
	_id: string;
	name: string;
	timeDate: number | null;
	accumulatedTime: number;
	timeSeted: number | null;
}

// ****************************************************************************
// 										          sockets
// ****************************************************************************

interface ServerToClientEvents {
	noArg: () => void;
	basicEmit: (a: number, b: string, c: Buffer) => void;
	withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
	hello: () => void;
}

// ****************************************************************************
// 										          calculadora
// ****************************************************************************

export enum MathOperation {
	sum = "+",
	subtract = "-",
	division = "/",
	multiply = "*",
}

export interface CalculatorState {
	_id: string;
	a: number;
	b: number | null;
	mathOperation: MathOperation;
	result: number | null;
	currencyType: CurrencyType;
}
