import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent}  from './dashboard/dashboard.component';
import {ExpenseComponent} from './expense/expense.component';
import {GroupsComponent} from './groups/groups.component';
import {TransactionComponent} from './transaction/transaction.component';
import {BillsComponent} from './bills/bills.component'

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'expense',component:ExpenseComponent},
  {path:'groups',component:GroupsComponent},
  {path:'transaction',component:TransactionComponent},
  {path:'bill',component:BillsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
