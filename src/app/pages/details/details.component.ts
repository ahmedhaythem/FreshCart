import { CartService } from './../../core/services/cart.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';

@Component({
  selector: 'app-details',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  id:string=''
  productData:Product={} as Product
    wishData:Wishlist[]=[]
  
  constructor(private wishlist:WishlistService,private activatedRoute:ActivatedRoute,private products:ProductsService,private cart:CartService,private toastr: ToastrService){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p);
        this.id=p.get('id') as string
        console.log(this.id);
        this.getProductDetails()
        
      }
    })
    }

   getProductDetails(){
    this.products.getSpecificProduct(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.productData=res.data
        
        
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
