import { TransactionItem, TransactionType, Stock } from "./transaction-item";

import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class Factory {

	constructor() { }

	public createTransactionItem(object: any): TransactionItem {
		let ti = new TransactionItem(
			object["_id"], 
			object["isin"], 
			object["artifact_count"],
			object["typeid"])
		ti.stock.name = object["stock_name"];
		ti.valuePerAmount = object["artifact_value_per_count"];
		ti.timestamp = new Date(object["created_at"]);
		return ti;
	}

	public createStockItem(object: any): Stock {
		let stock = new Stock();
		stock.isin = object["isin"];
		stock.name = object["name"];
		stock.isActive = object["is_active"] === 1;
		return stock;
	}

	public ngDateToJSDate(dt: NgbDate): Date {
		return new Date(dt.year, dt.month-1, dt.day);
	}

}