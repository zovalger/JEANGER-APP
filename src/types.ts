import { type } from "os";

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

export interface ProductReferenceForm extends Omit<ProductReference, "_id"> {
	_id?: string;
}


// ****************************************************************************
// 										          Cronometros
// ****************************************************************************

export interface Stopwatch {
	_id: string;
	name: string;
	timeDate: Date;
	accumulatedTime: number;
	timeSeted: number;
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