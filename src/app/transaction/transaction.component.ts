import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
   transactionForm!: FormGroup;
  showUsers: boolean =false;
  selectedGroupId:any;
  groupList:any=[];
  users: any=[];
  expense: any=[];
  constructor(private formBuilder:FormBuilder,private expenseService:ExpenseService,private router:Router, private userService:UsersService){}
  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      GroupId: ['', Validators.required],
      userId:['',Validators.required],
      paidId:['',Validators.required],
      expId:['',Validators.required],
      amount:['',Validators.required]

    });
    this.getGroups();
    this.getMembers(this.selectedGroupId);
    this.getExpenseDetails();
  }

  addTransaction(){
    const GroupId=this.transactionForm.get('GroupId')?.value;
    const user_id= this.transactionForm.get('paidId')?.value;
    const paidId =localStorage.getItem('userId');
    const expId = this.transactionForm.get('expId')?.value;
    const amount =this.transactionForm.get('amount')?.value;

    this.expenseService.addTransaction(GroupId,user_id,paidId,expId,amount).subscribe(
      (res)=>{
        console.log("success",res);
        alert("Transaction Success");
        this.router.navigate(['/home']);
      },
      (error)=>{
        console.log("fail", error);
      }
      
    );
  }

  getMembers(groupid:any){

    this.userService.getUsers(groupid).subscribe(
      (res)=>  {
        this.showUsers=true;
        console.log(res);
        this.users=res;
  
      },
      (error)=>{
        console.log(error,"error");
      }
    );
   }
   getGroups(){
    const userId = localStorage.getItem('userId');
    this.userService.getGroups(userId).subscribe(
      (res)=>{
        this.groupList=res;
        console.log(res,"groups");
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  getExpenseDetails()
  {
    const userId = localStorage.getItem('userId');
    console.log(userId,"is the current user");
  
    this.expenseService.getExpenseDetails(userId).subscribe(
      (res:any) =>{
        console.log("Expense Details",res);
        this.expense = res;
        
      },
      error=>{console.log(error)}
    );
  }

}
