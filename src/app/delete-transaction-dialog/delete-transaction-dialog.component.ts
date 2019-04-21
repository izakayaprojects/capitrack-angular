import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { MatDialogRef } from "@angular/material/dialog";
import { MessagesService } from "../messages.service";
import { AlertType } from "../_models/alert"

import { TransactionItem } from "../_models/transaction-item";
import { TransactionItemService } from "../transaction-item.service";

@Component({
  selector: 'app-delete-transaction-dialog',
  templateUrl: './delete-transaction-dialog.component.html',
  styleUrls: ['./delete-transaction-dialog.component.css']
})
export class DeleteTransactionDialogComponent implements OnInit {

	@Input() transaction: TransactionItem;

	deleteMsg = "Are you sure you want to delete this transaction?"

  constructor(
  	private tiService: TransactionItemService,
  	private msgService: MessagesService,
  	private dialogRef: MatDialogRef<DeleteTransactionDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) private data: any) { 

  	this.transaction = data.transaction;
  }

  ngOnInit() {
  }

  deleteTrx() {
  	this.tiService.deleteTransaction(this.transaction)
  		.subscribe(result => {
  			if (result["success"]) {
  				this.dialogRef.close({refresh: true});
  				this.msgService.alert(AlertType.Success, "Transaction has been successfully deleted");
  			} else {
  				this.msgService.alert(AlertType.Danger, result["message"]);
  			}
  		})
  }

  cancel() {
  	this.dialogRef.close();
  }
}
