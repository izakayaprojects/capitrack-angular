export enum TransactionType {
	Deposit = 1,
	Dividend = 2,
	Fee = 6,
	Buy = 3,
	Sell = 4,
	Payout = 5
}

export class Stock {
	isin: string;
	name: string;

	constructor() { }
}

export class TransactionItem {
	id: string;
	timestamp: string;
	amount: number;
	valuePerAmount: number;
	stock: Stock;
	type: TransactionType;
	note: string;

	constructor(id: string, isin: string, amount: number, type: TransactionType, note: string = "") {
		this.id = id;
		this.amount = amount;
		this.type = type;
		this.note = note;
		this.stock = new Stock();
		this.stock.isin = isin;
	}

	public getTypeName(): string {
		return TransactionType[this.type];
	}
}