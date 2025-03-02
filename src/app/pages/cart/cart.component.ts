import { Cart } from './../../core/interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartData:Cart={} as Cart
  cartId:string=''

  constructor(private cart:CartService){}

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.cart.getCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartId=res.cartId
        this.cartData=res.data
        this.cart.numOfCartItems.set(res.numOfCartItems)
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:string){
    this.cart.removeCartItem(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=res.data
        this.cart.numOfCartItems.set(res.numOfCartItems)
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  updateProductQuantity(product_id:string,count:number){
    this.cart.updateProductQuantity(product_id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=res.data
        this.cart.numOfCartItems.set(res.numOfCartItems)

      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  clearCart(){
    this.cart.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData={} as Cart
        this.cart.numOfCartItems.set(0)
      },error:(err)=>{console.log(err);
      }
    })
  }
}
