import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import {  Wishlist } from '../../core/interfaces/wishlist';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  wishlistData:Wishlist[]=[]

  constructor(private toastr: ToastrService,private cart:CartService,private wishlist:WishlistService ){}

  ngOnInit(): void {
    this.getWishlist()
  }

  addToCart(id:string){
    this.cart.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.showSuccess(res.message)
        
      },error:(err)=>{
        console.log(err);

      }
    })
   }

   showSuccess(mssg:string) {
    this.toastr.success(mssg, 'FreshCart');
  }

  getWishlist(){
    this.wishlist.getWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishlistData=res.data
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeFromWishlist(id:string){
    this.wishlist.removeFromWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.showSuccess(res.message)
        this.getWishlist()
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
