import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  cartdId:string=""
  checkoutForm!:FormGroup
  constructor(private activedRoute:ActivatedRoute, private orders:OrdersService){}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((p)=>{
      this.cartdId=p.get('id') as string
    })
    console.log(this.cartdId);
    
    this.checkoutForm=new FormGroup({
      details:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required,Validators.pattern(/^^01[0-2,5]{1}[0-9]{8}$$/)]),
      city:new FormControl(null,[Validators.required]),
    })
  }

  submitForm(){
    console.log(this.checkoutForm.value);
    this.orders.onlinePayment(this.cartdId,this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.open(res.session.url,'_self')
      },error:(err)=>{console.log(err);
      }
    })
  }
}
