import { TransactionItem, TransactionType } from "./transaction-item";

export class Factory {

	constructor() { }

	public createTransactionItem(object: any): TransactionItem {
		let ti = new TransactionItem(
			object["_id"], 
			object["isin"], 
			object["artifact_count"],
			object["typeid"])
		ti.valuePerAmount = object["artifact_value_per_count"];
		ti.timestamp = object["created_at"];
		return ti;
	}

}