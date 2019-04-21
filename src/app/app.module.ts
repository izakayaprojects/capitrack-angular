import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { DeleteTransactionDialogComponent } from './delete-transaction-dialog/delete-transaction-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionItemComponent,
    TransactionDetailComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    NavigationComponent,
    AddTransactionComponent,
    DeleteTransactionDialogComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTransactionComponent, 
    DeleteTransactionDialogComponent
  ]
})
export class AppModule { }
