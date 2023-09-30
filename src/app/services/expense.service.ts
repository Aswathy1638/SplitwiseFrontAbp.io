import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiurl= 'https://localhost:7134/api/Expenses';

  constructor(private http:HttpClient) { }

  getBalance(userId:any)
  {
    const url=`${this.apiurl}/Expense/Balance?userId=${userId}`;
    
    return this.http.get(url);
  }

  getOweAmount(userId:any)
  {
    const url = `${this.apiurl}/Expense/Balance/owe?userId=${userId}`;
    return  this.http.get(url);
  }
  
  getOwedAmount(userId:any)
  {
    const url = `${this.apiurl}/Expense/Balance/owed?userId=${userId}`;
    return  this.http.get(url);
  }
  getExpenseDetails(userId:any)
  {
    const url = `${this.apiurl}/Expense/${userId}`;
    return this.http.get(url);
    }

    addExpense(Description:any,GroupId:any,UserId:any,PaidUserId: any,amount:any)
    {
      const url =`${this.apiurl}/Expense`;
      const body={ Description , GroupId, UserId,PaidUserId,amount} ;
   
      return   this.http.post<any>(url,body );
        }

       


        addTransaction(GroupId:any,payerName:any,paidUserId:any,expenseId:any,transaction_Amount:any)
        {
          const url=`${this.apiurl}/Transaction`;
          const body={GroupId,payerName,paidUserId,expenseId,transaction_Amount};
          return this.http.post<any>(url,body);

        }
       

        getBalanceDetails(userId:string)
        {
          const token =localStorage.getItem('jwtToken');
          const httpOptions ={
            headers:new HttpHeaders(
              {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            )
          };
          const url=`${this.apiurl}/Expense/Balance/Details?userId=${userId}`;

          return this.http.get(url,httpOptions);
        }
}
