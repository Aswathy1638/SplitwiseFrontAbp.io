import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../services/expense.service'
import { FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit  {
  expense:any=[];
  showExpenseForm:boolean=false;
  expenseForm!: FormGroup;
  groupList:any=[];
  showUsers: boolean=false;
  users:any=[];
  selectedGroupId:any;
  
 
  
  
  constructor(private expenseService:ExpenseService,private router:Router,private formBuider:FormBuilder,private userService:UsersService){}
  ngOnInit(): void {
    this.expenseForm = this.formBuider.group({
      Description: ['', Validators.required],
      GroupId: ['', Validators.required],
      paiduser_id: ['', Validators.required],
      amount: ['', Validators.required],
      shareAmount: ['', Validators.required]
    });
    this.getGroups();
    this.getMembers(this.selectedGroupId);
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

 toggleExpenseForm() {
  this.showExpenseForm = true;
  
 }
 onSubmit(){

  const description = this.expenseForm.get('Description')?.value;
  const groupId = this.expenseForm.get('GroupId')?.value;
  const paidUserId = this.expenseForm.get('paiduser_id')?.value;
  const amount = this.expenseForm.get('amount')?.value;
  // const shareAmount = this.expenseForm.get('shareAmount')?.value;
  const userId = localStorage.getItem('userId');

  this.expenseService.addExpense(description,groupId,userId,paidUserId,amount)
  .subscribe((res)=>{
    console.log("added",res);
    alert('Expense Created successfully!');
    this.router.navigate(['/home']);
  },
  (error) => {
    
    console.error('error', error);
  }
  
  );

 }
 navigateToTransaction(){
  this.router.navigate(['/transaction']);
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

}
