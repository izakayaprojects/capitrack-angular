import { Component, OnInit, Input } from '@angular/core';

import { TransactionType, TransactionItem } from "../_models/transaction-item"
import { TransactionItemService } from "../transaction-item.service";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

	transactionTypes = [];
	selectedTransactionType = {id: -1, name: "Transaction type"};

	@Input() newTransaction: TransactionItem = new TransactionItem("", "", 1, 1);

  constructor(private tiService: TransactionItemService) { }

  ngOnInit() {
  	this.tiService.getTransactionTypes().subscribe(result => {
  		this.transactionTypes = result;
  	});
  }

  onPickTransactionType(typeId) {
  	this.selectedTransactionType = {id: typeId, name: TransactionType[typeId]};
  	// TODO display other inputs
  }

}
