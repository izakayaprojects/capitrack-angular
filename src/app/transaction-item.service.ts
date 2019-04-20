import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';

import { MessagesService } from './messages.service';
import { Factory } from './_models/factory';
import { TransactionItem, TransactionType } from "./_models/transaction-item";
import { MOCK_TRANSACTION_ITEMS } from "./mocks/mock-transaction-items";

import { API_ENV, CONSTANTS } from './global';

@Injectable({
  providedIn: 'root'
})

export class TransactionItemService {

  constructor(
    private messageService: MessagesService,
    private http: HttpClient,
    private localStorage: LocalStorageService) { }

  getTransactions() {
    let token = this.localStorage.retrieve(CONSTANTS.LSKEY_TOKEN);
    return this.http.post(API_ENV.debug.url+"/transactions", {token: token})
      .pipe(map(result => {
        let data = result["data"];
        let items: TransactionItem[] = [];
        let factory = new Factory();
        for (let entry of data) {
          items.push(factory.createTransactionItem(entry));
        }
        return items;
      }))
  }

  getMockTransactionItems(): Observable<TransactionItem[]> {
  	this.messageService.add("Retrieving transactions...");
  	return of(MOCK_TRANSACTION_ITEMS);
  }

  getMockTransactionItem(id: string): Observable<TransactionItem> {
  	this.messageService.add(`Retrieving transaction with id ${id}`);
  	return of(MOCK_TRANSACTION_ITEMS.find(item => item.id === id));
  }
}
