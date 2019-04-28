import { Component, OnInit, Input } from '@angular/core';
import { TransactionItem, TransactionType } from "../_models/transaction-item";

@Component({
  selector: 'app-dashboard-category-summary',
  templateUrl: './dashboard-category-summary.component.html',
  styleUrls: ['./dashboard-category-summary.component.css', '../app.component.css']
})
export class DashboardCategorySummaryComponent implements OnInit {

	@Input() transactions: TransactionItem[];
	@Input() ttype: TransactionType = -1;

	highestValueTrx: TransactionItem
	lowestValueTrx: TransactionItem

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  	let trx = this.getHighestAndLowestValueTrx();
  	this.highestValueTrx = trx.highest;
  	this.lowestValueTrx = trx.lowest;
  }

  getBadgeClass(): string {
  	switch (this.ttype) {
  		case 0: return "badge-primary"
  		case TransactionType.Deposit: return "bg-deposit"
  		case TransactionType.Buy: return "bg-buy"
  		case TransactionType.Dividend: return "bg-dividend"
  		case TransactionType.Sell: return "bg-sell"
  		case TransactionType.Fee: return "bg-fee"
  		case TransactionType.Payout: return "bg-payout"
  	}
  	return ""
  }

  getSummaryHeader(): string {
		switch (this.ttype) {
  		case 0: return "All Transactions"
  		default: return TransactionType[this.ttype]
  	}
  }

  getHighestAndLowestValueTrx(): any {
  	let chosenTrx = { highest: undefined, lowest: undefined }
  	
  	if (this.transactions === undefined || this.transactions.length == 0) 
  		return chosenTrx;

  	let highestValue = -1
  	let lowestValue = Number.MAX_SAFE_INTEGER
  	this.transactions.forEach(t => {
  		let value = t.getTotalValue()
  		if (highestValue < value) {
  			highestValue = value;
  			chosenTrx.highest = t;
  		}
  		if (lowestValue > value) {
  			lowestValue = value;
  			chosenTrx.lowest = t;
  		}
  	})

  	return chosenTrx
  }

}
