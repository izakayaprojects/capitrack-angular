import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { Stock } from "../_models/transaction-item";
import { OpenfigiApiService } from "../openfigi-api.service";
import { TransactionItemService } from "../transaction-item.service"

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

	@Input() newStock: Stock = null;
  isinInput = ""
  stockCheckMessage: string = ""

  isSearchingForStock = false
  newStockFound = false

  constructor(
    private dialogRef: MatDialogRef<AddStockComponent>,
    private openFigi: OpenfigiApiService,
    private tiService: TransactionItemService) { }

  ngOnInit() {
  }

  clearStock() {
    this.newStockFound = false
    this.newStock = null
  }

  addStock() {
    if (this.newStockFound !== null && this.newStockFound) {
      // TODO add stock along with auth
    }
  }

  checkStockByISIN(isin: string) {
    this.isSearchingForStock = true
    this.stockCheckMessage = "";
    if (isin === undefined || isin === "") {
      this.stockCheckMessage = "Cannot check empty ISIN!";
      this.isSearchingForStock = false
      return;
    }

    this.tiService.getStockByISIN(isin).subscribe(fromDb => {
      if (fromDb != null) {
        this.stockCheckMessage = "Stock has already been registered!"
        this.newStock = fromDb
        this.isSearchingForStock = false
      } else {
        this.openFigi.getStockByISIN(isin).subscribe(stock => {
          if (stock === null) {
            this.newStock = null
            this.stockCheckMessage = "Invalid ISIN!";
          } else {
            this.newStock = stock
            this.newStockFound = true
          }
          this.isSearchingForStock = false
        })
      }
    })

  }

}
