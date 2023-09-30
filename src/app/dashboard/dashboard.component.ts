import { Component } from '@angular/core';
import {ExpenseService} from '../services/expense.service'
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userId:any;
  balance:any;
  oweAmount: any;
  owedAmount: any;
  constructor(private expenseService:ExpenseService){}

  getBalance()
  {
   const userId = localStorage.getItem('userId');
   console.log("userid",userId);
    this.expenseService.getBalance(userId).subscribe(
      (response)=>{
        console.log("balance", response);
        this.balance=response;
      },
      error=>{console.log('Error');}
    );
  }

  getOweAmount()
  {
    const userId = localStorage.getItem('userId');
   console.log("userid",userId);
    this.expenseService.getOweAmount(userId).subscribe(
      (response)=>{
        console.log("Owe Amount", response);
        this.oweAmount=response;
      },
      error=>{console.log('Error',error);}
    );

  }
  getOwedAmount()
  {
    const userId = localStorage.getItem('userId');
   console.log("userid",userId);
    this.expenseService.getOwedAmount(userId).subscribe(
      (response)=>{
        console.log("Owed Amount", response);
        this.owedAmount=response;
      },
      error=>{console.log('Error',error);}
    );

  }
  


}
