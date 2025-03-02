import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl ,FormGroup,ReactiveFormsModule, Validators} from "@angular/forms"
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isLoading:boolean=false;
  errorMsg:string="";
  constructor(private flowbiteService:FlowbiteService , private auth:AuthService,private router:Router){}

  ngOnInit(): void {
    
    this.flowbiteService.loadFlowbite(flowbite => {
          
      console.log('Flowbite loaded', flowbite);
    });
  }

  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
 
  })


  submit(){
    if(this.loginForm.valid){
      console.log(this.loginForm)
      this.isLoading=true
      this.auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading=false
        localStorage.setItem('userToken',res.token)
        this.auth.decodetoken()
        console.log(this.auth.userData);
        
        this.errorMsg="";
        this.router.navigate(["/home"])
        
      },error:(err)=>{
        console.log(err);
        this.isLoading=false
        this.errorMsg=err.error.message
        
      }
    })
  }else{
    this.loginForm.markAllAsTouched()
  }
  }

}
