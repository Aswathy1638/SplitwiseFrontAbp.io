import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users.service'
import { FormArray, FormBuilder ,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  name:any;
  description:any;
  group!: any;
  groupForm!: FormGroup;
  userForm!: FormGroup;
  showUserForm: boolean = false;
  showGroupForm: boolean=false;
  userAdded: boolean =false;
  users:any;
  showUsers: boolean=false;
  userList:any=[];
  groupList:any=[];
  selectedGroupId:any;
  value: any=[];
  showBal: boolean=false;
  //lasttt

  selectedUserName!: string;

  
  constructor(private userService:UsersService,private formBuilder:FormBuilder,private router:Router,private ExpenseService:ExpenseService){}
  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      
    });
    this.userForm  =   this.formBuilder.group ({
      Name :['',[Validators.required]],
      //Email :['',[Validators.email,Validators.required]],
      selectedUsers: this.formBuilder.array([]) 
    });
    this.getUsers();
    this.getGroups();
  }
  userPopoverContent(user: any): string {
    return `<p>Owe: ${user.owe}</p><p>Owed: ${user.owed}</p>`;
  }
  
  toggleExpenseForm() {
    this.showGroupForm = true;
    
   }
   toggleUserForm() {
    this.showUserForm = true;
    
   }
  getGroups(){
    const userId = localStorage.getItem('userId');
    this.userService.getGroups(userId).subscribe(
      (res)=>{
        this.group=res;
        console.log(res,"groups");
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  onSubmit(){

    const name = this.groupForm.get('Name')?.value;
    const description = this.groupForm.get('Description')?.value;
    
    this.userService.createGroup(name,description)
    .subscribe((res)=>{
      console.log("added",res);
      alert('Group created successfully!');
      this.router.navigate(['/home']);
    },
    (error) => {
      
      console.error('error', error);
      alert(error.error);
    }
    
    );
  
   }

   addUserToGroup(){
    const groupname =this.userForm.get('Name')?.value;
    const selectedUsers = this.userForm.get('selectedUsers') as FormArray;


    const selectedEmails: string[] = [];

   
    for (let i = 0; i < selectedUsers.length; i++) {
      if (selectedUsers.at(i).value) {
  
        selectedEmails.push(this.userList[i].email);
      }

      console.log(selectedEmails,"emails");
    }

    
    this.userService.addUser(groupname,selectedEmails).subscribe
    ((res)=>{
      
      console.log("user added",res);
      this.userAdded=true;
      alert('User added successfully!');
      this.router.navigate(['/home']);

    },
    (error)=>{
      console.log(error,'error');
    });

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
 
  getUsers() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.userList = res;
        this.initializeSelectedUsersFormArray(); 
        console.log(res, "userlist");
      }
    );
  }
  
   updateSelectedUsers(email: string) {
    const selectedUsers = this.userForm.get('selectedUsers') as FormArray;
    if (selectedUsers) {
      const emailControl = this.formBuilder.control(email);
      if (selectedUsers.value.includes(email)) {
        // Find the index of the email in the FormArray and remove it
        const index = selectedUsers.value.indexOf(email);
        selectedUsers.removeAt(index);
      } else {
        // Add the email to the FormArray
        selectedUsers.push(emailControl);
      }
    }
  }
  
  
  initializeSelectedUsersFormArray() {
    const selectedUsers = this.userForm.get('selectedUsers') as FormArray;
    this.userList.forEach(() => {
      selectedUsers.push(this.formBuilder.control(false)); 
    });
  }
  

  getBalDetails(userId:any){
    this.ExpenseService.getBalanceDetails(userId).subscribe(
      (res)=>{
        this.showBal=true;
        this.value=res;
        console.log(res,"success");
        const selectedUser = this.users.find((user: { id: any; }) => user.id === userId);
      if (selectedUser) {
        this.selectedUserName = selectedUser.name;
      }
      },
      (error)=>{
        console.log("Error", error);
      }
    );
  }

}
