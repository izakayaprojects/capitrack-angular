export enum TransactionType {
	Deposit = 1,
	Dividend = 2,
	Buy = 3,
	Sell = 4,
	Payout = 5,
	Fee = 6
}

export class Stock {
	isin: string;
	name: string;
	isActive: boolean = true;
	marketSector: string;
	securityType: string;
	securityType2: string;

	constructor() { }
}

export class TransactionItem {
	id: string;
	timestamp: Date = null;
	amount: number = 0;
	valuePerAmount: number = 0.0;
	stock: Stock = null;
	type: TransactionType = null;
	note: string;

	constructor(id: string, isin: string, amount: number, type: TransactionType, note: string = "") {
		this.id = id;
		this.amount = amount;
		this.type = type;
		this.note = note;
		this.stock = new Stock();
		this.stock.isin = isin;
	}

	public needStock(): boolean {
		return this.type === TransactionType.Buy || this.type === TransactionType.Dividend || this.type === TransactionType.Sell;
	}

	public isDbInsertReady(): boolean {
		return this.amount >= 0 && 
			this.stock !== null && this.type !== null && this.stock.isin !== "" &&
			this.timestamp !== null;
	}

	public getTypeName(): string {
		return TransactionType[this.type];
	}
}