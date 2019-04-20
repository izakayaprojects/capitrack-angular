import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TransactionDetailComponent } from "./transaction-detail/transaction-detail.component";
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth-guard';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
	{ path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: "transactions", component: TransactionItemComponent, canActivate: [AuthGuard] },
	{ path: "detail/:id", component: TransactionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
