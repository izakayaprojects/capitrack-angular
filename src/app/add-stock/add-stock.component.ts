import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { Stock } from "../_models/transaction-item";
import { OpenfigiApiService } from "../openfigi-api.service";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

	@Input() newStock: Stock = {
		isin: "",
		name: "",
		isActive: true
	};
  stockCheckMessage: string = ""

  constructor(
    private dialogRef: MatDialogRef<AddStockComponent>,
    private openFigi: OpenfigiApiService) { }

  ngOnInit() {
  }

  checkStockByISIN(isin: string) {
    this.stockCheckMessage = "";
    if (isin === undefined || isin === "") {
      this.stockCheckMessage = "Cannot check empty ISIN!";
      return;
    }
    // TODO check local DB first
    this.openFigi.getStockByISIN(isin).subscribe(stock => {
      if (stock["name"] === undefined) {
        this.stockCheckMessage = "Invalid ISIN!";
      } else {
        // TODO display the info
      }
    })

  }

}
