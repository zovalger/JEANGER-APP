import { CurrencyType, MathOperation } from "./enums";

export interface propsWithChildren {
	children: any;
}

// ****************************************************************************
// 										          productos
// ****************************************************************************

export interface ForeignExchange {
	euro: number;
	dolar: number;
	date: Date;
}

export interface Product {
	_id: string;
	name: string;
	cost: number;
	currencyType: CurrencyType;
	keywords: string[];
	priority: number;
	favorite: boolean;
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

export interface ProductReferenceForm extends Omit<ProductReference, "_id"> {
	_id?: string;
}

// ****************************************************************************
// 										          productos: Settings
// ****************************************************************************

export interface ProductSettings {
	_id: string;
	stopwatchProductId: string | null;
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

export interface CalculatorState {
	_id: string;
	a: number;
	b: number | null;
	mathOperation: MathOperation;
	result: number | null;
	currencyType: CurrencyType;
}

// ****************************************************************************
// 										          Facturas
// ****************************************************************************

export interface BillItem {
	productId: string;
	quantity: number;
	cost: number;
	currencyType: CurrencyType;
}

export interface BillTotals {
	BSF: number;
	USD: number;
}

export interface Bill {
	_id: string;
	date: Date;
	items: BillItem[];
	foreignExchange: ForeignExchange;
	totals: BillTotals;
}
