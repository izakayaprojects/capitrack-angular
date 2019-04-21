import { Component, OnInit, Input } from '@angular/core';
import { Stock } from "../_models/transaction-item";
import { Observable, of } from "rxjs";
import { map, switchMap, catchError, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogRef } from "@angular/material/dialog";

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
    timestamp: "",
    insertion: ""
  };

	transactionTypes = [];
	selectedTransactionType = {id: -1, name: "Transaction type"};

	@Input() newTransaction: TransactionItem = new TransactionItem("", "", 1, 1);

  constructor(
    private tiService: TransactionItemService,
    private dialogRef: MatDialogRef<AddTransactionComponent>
    ) {
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
      this.errorMsgs = { stock: "", amount: "", valuePerCount: "", timestamp: "", insertion: "" }
      this.tiService.addTransaction(this.newTransaction).subscribe(result => {
        if (result !== undefined || result !== null || result !== "") {
          this.dialogRef.close({refresh: true});
        } else {
          this.errorMsgs.insertion = "Error adding transaction!"
        }
      })
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
