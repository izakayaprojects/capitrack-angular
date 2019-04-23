import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Stock } from "./_models/transaction-item";
import { Factory } from "./_models/factory";

const FACTORY = new Factory();
const PROXY = "https://cors-anywhere.herokuapp.com/"
const API_PATH = "https://api.openfigi.com/v2/mapping";

@Injectable({
  providedIn: 'root'
})
export class OpenfigiApiService {

  constructor(private http: HttpClient) { }

  getStockByISIN(isin: string): Observable<Stock> {
  	let body = [{
  		idType: "ID_ISIN",
  		idValue: isin
  	}]
  	return this.http.post(PROXY+API_PATH, body).pipe(
			map(result => {
				console.log(result);
				let resBody = result[0];
				if (resBody["error"]) {
					return null;
				} else {
					let first = resBody["data"][0]
					return FACTORY.createStockItemFromOpenFigi(isin, first);
				}
			}),
			catchError(() => of(null))
  	);
  }

}
