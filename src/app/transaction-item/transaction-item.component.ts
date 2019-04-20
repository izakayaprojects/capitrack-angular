import { Component, OnInit } from '@angular/core';
import { TransactionItem, TransactionType } from '../_models/transaction-item';
import { TransactionItemService } from "../transaction-item.service";
import { UserCredService } from "../user-cred.service";

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})

export class TransactionItemComponent implements OnInit {

  items: TransactionItem[];
	selectedItem: TransactionItem;

  constructor(
    private tiService: TransactionItemService,
    private ucService: UserCredService) { }

  ngOnInit() {
    this.tiService.getTransactions().subscribe(results => this.items = results)
  }

  onSelect(transactionitem: TransactionItem) {
  	this.selectedItem = transactionitem
  }
}
