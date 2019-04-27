import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserCredService } from '../user-cred.service';
import { TransactionItemService } from "../transaction-item.service";
import { TransactionItem, TransactionType } from "../_models/transaction-item";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../app.component.css']
})
export class DashboardComponent implements OnInit {

	TType = TransactionType

	transactions: TransactionItem[];
	viewType = 0;
	filteredTransactions: TransactionItem[];

  constructor(
  	private ucService: UserCredService,
  	private tiService: TransactionItemService,
  	private router: Router) {
  }

  ngOnInit() {
  	this.tiService.getTransactions().subscribe(result => 
  		this.transactions = result
  	)
  }

}
