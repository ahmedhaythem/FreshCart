
import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import {  Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';

import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Wishlist } from '../../core/interfaces/wishlist';



@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink,NgxPaginationModule,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productsList:Product[]=[]
  wishData:Wishlist[]=[]
  p: number = 1;


  constructor(private products:ProductsService,private category:CategoriesService,private cart:CartService,private toastr: ToastrService,private wishlist:WishlistService){}
  ngOnInit(): void {
    this.getProducts()
    this.getWishlist()

  }

  getProducts(){
    this.products.getProducts(this.p).subscribe({
      next:(res)=>{
        console.log(res);
        this.productsList=res.data
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
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

   onPageChange(page: number) {
    this.p = page;
    this.products.getProducts(this.p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showSuccess(mssg:string) {
    this.toastr.success(mssg, 'FreshCart');
  }

  getWishlist(){
    this.wishlist.getWishlist().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishData=res.data
        console.log(this.wishData);
        
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  isInWishlist(productId: string): boolean {
    const found = this.wishData.some(item => item._id === productId);
    return found;
  }

  hearBtntWishlist(id:string){
    if(this.isInWishlist(id)){
      this.removeFromWishlist(id)
    }else{
      this.addToWishlist(id)
    }
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


  addToWishlist(id:string){
    this.wishlist.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getWishlist()
        this.showSuccess(res.message)
        
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
