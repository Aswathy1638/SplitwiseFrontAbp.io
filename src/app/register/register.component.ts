import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private userService:UsersService,private router:Router){}
  ngOnInit(): void {
    this.registerForm =this.formBuilder.group(
      {
        name : ['',Validators.required],
        email : ['',[Validators.required,Validators.email]],
        password  :['', Validators.required ]
      }
    );
  }
  onSubmit(){
   if(this.registerForm.valid)
   {
    const {name,email,password} = this.registerForm.value;
    this.userService.registerUser(name,email,password).subscribe(
      (res) =>{ console.log('Registration successful', res);
      
      this.router.navigate(['/']);
    },
    (error) => {
      
      console.error('Registration error', error);
    }
    );
    
   }

  }
}
