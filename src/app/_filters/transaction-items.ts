import { Pipe, PipeTransform } from "@angular/core";
import { TransactionItem, TransactionType } from "../_models/transaction-item";

@Pipe({name: 'filterByType'})
export class FilterByType implements PipeTransform {
	transform(list: TransactionItem[], keyword: TransactionType): TransactionItem[] {
		if (!list) return [];
		if (!keyword) return list;
		return list.filter(ti => ti.type === keyword)
	}

}