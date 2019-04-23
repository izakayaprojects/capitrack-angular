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
		stock.marketSector = object["market_sector"];
		stock.securityType = object["security_type"];
		stock.securityType2 = object["security_type2"];
		stock.isActive = object["is_active"] === 1;
		return stock;
	}

	public createStockItemFromOpenFigi(isin: string, object: any): Stock {
		let stock = new Stock();
		stock.isin = isin;
		stock.name = object["name"];
		stock.marketSector = object["marketSector"];
		stock.securityType = object["securityType"];
		stock.securityType2 = object["securityType2"];
		stock.isActive = true;
		return stock;
	}

	public ngDateToJSDate(dt: NgbDate): Date {
		return new Date(dt.year, dt.month-1, dt.day);
	}

	public jsDateToSQLDate(dt: Date): String {
		return dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
	}

}