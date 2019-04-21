import { Component, OnInit, Input } from '@angular/core';
import { Stock } from "../_models/transaction-item";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

import { TransactionType, TransactionItem } from "../_models/transaction-item"
import { TransactionItemService } from "../transaction-item.service";
import { Factory } from "../_models/factory";

const FACTORY = new Factory();

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  errorMsgs = {
    stock: "",
    amount: "",
    valuePerCount: "",
    timestamp: ""
  };

	transactionTypes = [];
	selectedTransactionType = {id: -1, name: "Transaction type"};

	@Input() newTransaction: TransactionItem = new TransactionItem("", "", 1, 1);

  constructor(private tiService: TransactionItemService) {
  }

  ngOnInit() {
  	this.tiService.getTransactionTypes().subscribe(result => {
  		this.transactionTypes = result;
  	});
  }

  onPickTransactionType(typeId) {
  	this.selectedTransactionType = {id: typeId, name: TransactionType[typeId]};
    this.newTransaction.type = typeId;
  }

  onDateSelected(date: NgbDate) {
    this.newTransaction.timestamp = FACTORY.ngDateToJSDate(date);
  }

  addTransaction() {
    let hasError = false;
    if (this.newTransaction.needStock() && 
      (this.newTransaction.stock === null || this.newTransaction.stock.isin === "")) {
      this.errorMsgs.stock = "Stock cannot be empty!"
      hasError = true;
    }

    if (this.newTransaction.timestamp === null) {
      this.errorMsgs.timestamp = "Timestamp is required!"
      hasError = true;
    }

    if (!hasError) {
      // TODO prepare insertion
    }
  }

  findStock = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),   
      switchMap(term => this.tiService.findStocksByName(term).pipe(
        catchError(() => of([]))
      ))
    )

  stockInputFormatter = (x: Stock) => x.name

}
