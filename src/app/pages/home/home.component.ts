import { CartService } from './../../core/services/cart.service';

import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Category, Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/interfaces/wishlist';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from '../../core/services/flowbite.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule,CarouselModule,RouterLink,CurrencyPipe,SearchPipe,NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productsList:Product[]=[]
  categoryList:Category[]=[]
  searchTerm:string=''
  p: number = 1;
  wishData:Wishlist[]=[]


  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    items:1,
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  constructor(private flowbiteService:FlowbiteService ,private products:ProductsService,private category:CategoriesService,private cart:CartService,private toastr: ToastrService,private wishlist:WishlistService){}
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()
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

   getCategories(){
    this.category.getCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.categoryList=res.data
        
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
        this.cart.numOfCartItems.set(res.numOfCartItems)
        
      },error:(err)=>{
        console.log(err);

      }
    })
   }

   onPageChange(page: number) {
    this.p = page;
    this.products.getProducts(this.p);
    window.scrollTo({ top: 900, behavior: 'smooth' });
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
