export enum TransactionType {
	Deposit = 1,
	Dividend = 2,
	Fee = 6,
	Buy = 3,
	Sell = 4,
	Payout = 5
}

export class TransactionItem {
	id: string;
	timestamp: string;
	isin: string;
	amount: number;
	valuePerAmount: number;
	type: TransactionType;
	note: string;

	constructor(id: string, isin: string, amount: number, type: TransactionType, note: string = "") {
		this.id = id;
		this.isin = isin;
		this.amount = amount;
		this.type = type;
		this.note = note;
	}

	public getTypeName(): string {
		return TransactionType[this.type];
	}
}