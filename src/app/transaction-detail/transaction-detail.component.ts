import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { TransactionItemService } from "../transaction-item.service";
import { TransactionItem, TransactionType } from "../_models/transaction-item";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

	@Input() item: TransactionItem;

  constructor(
  	private route: ActivatedRoute,
  	private tiService: TransactionItemService,
		private location: Location) { }

  ngOnInit() {
  	const id = this.route.snapshot.paramMap.get("id");
  	this.tiService.getMockTransactionItem(id)
  		.subscribe(titem => this.item = titem);
  }

  goBack(): void {
  	this.location.back();
  }

}
