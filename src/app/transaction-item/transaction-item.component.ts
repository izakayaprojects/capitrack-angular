import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { TransactionItem, TransactionType } from '../_models/transaction-item';
import { TransactionItemService } from "../transaction-item.service";
import { AddTransactionComponent } from "../add-transaction/add-transaction.component";
import { DeleteTransactionDialogComponent } from "../delete-transaction-dialog/delete-transaction-dialog.component";
import { UserCredService } from "../user-cred.service";

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})

export class TransactionItemComponent implements OnInit {

  items: TransactionItem[];
	selectedItem: TransactionItem;

  private mDialogNewTransaction: MatDialogRef<AddTransactionComponent>;
  private mDialogDelTransaction: MatDialogRef<DeleteTransactionDialogComponent>;

  constructor(
    private tiService: TransactionItemService,
    private ucService: UserCredService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions() {
    this.tiService.getTransactions().subscribe(results => this.items = results)  
  }

  onSelect(transactionitem: TransactionItem) {
  	this.selectedItem = transactionitem
  }

  onTrxEdit(trx: TransactionItem) {
    // TODO edit transaction window
  }

  onTrxDelete(trx: TransactionItem) {
    this.mDialogDelTransaction = this.dialog.open(DeleteTransactionDialogComponent, {
      data: { transaction: trx }
    });
    this.mDialogDelTransaction.afterClosed().subscribe(result => {
      if (result !== undefined && result.refresh == true) {
        this.getTransactions();
      }
    })
  }

  showNewTransactionWindow() {
    this.mDialogNewTransaction = this.dialog.open(AddTransactionComponent, {
      height: "400px",
      minWidth: "400px"
    });
    this.mDialogNewTransaction.afterClosed().subscribe(result => {
      if (result !== undefined && result.refresh == true) {
        this.getTransactions();
      }
    })
  }
}
