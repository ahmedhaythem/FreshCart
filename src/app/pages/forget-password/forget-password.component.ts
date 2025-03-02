import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  step:number=1
  email:string=''
  constructor(private auth:AuthService, private router:Router){}
forgetForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})

confirmCodeForm:FormGroup=new FormGroup({
  resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
})

resetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.minLength(6)])
})


forget(){
  this.email=this.forgetForm.get('email')?.value
  this.resetPasswordForm.get('email')?.patchValue(this.email)
  this.auth.forgetPassword(this.forgetForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=2

    },error:(err)=>{
      console.log(err);
      
    }
  })
}

confirmCode(){
  this.auth.confrimCode(this.confirmCodeForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.step=3

    },error:(err)=>{
      console.log(err);
      
    }
  })
}

reset(){
  this.auth.resetPassword(this.resetPasswordForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      localStorage.setItem("userToken",res.token)
      this.router.navigate(["/home"])

    },error:(err)=>{
      console.log(err);
      
    }
  })
}

}
