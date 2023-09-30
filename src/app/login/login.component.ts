import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import {UsersService} from '../services/users.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  userInitial:string='';
     
 
  constructor(private userService : UsersService,private formBuilder : FormBuilder,private router:Router) {}
  ngOnInit(): void {
   this.loginForm = this.formBuilder.group({
    
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    });
  }
onSubmit() : void{
  if(this.loginForm.invalid){
    return ;
  }
  
 if (this.loginForm.valid) {
  const {email ,password } = this.loginForm.value;
  console.log('Email:', email);
  console.log('Password:', password);
  this.userService.loginUser(email,password).subscribe(
    (res)=>{ console.log('Login successful', res);
    this.userInitial=res.profile.name.charAt(0).toUpperCase();
    localStorage.setItem('userInitial',this.userInitial);
      localStorage.setItem('jwtToken',res.token);
    localStorage.setItem('userId',res.profile.id);
    this.router.navigate(['/home']);
  },
  (error) => {
    
    console.error('Registration error', error);
  }
  );

 } 

}

  

}

