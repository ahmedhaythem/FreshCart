import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlanckLayoutComponent } from './layouts/blanck-layout/blanck-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';


export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"" ,component:AuthLayoutComponent ,title:"auth",children: [
        {path:"login" ,canActivate:[loggedGuard],loadComponent:()=>import("./pages/login/login.component").then((c)=>c.LoginComponent) ,title:"login"},
        {path:"register" ,canActivate:[loggedGuard],loadComponent:()=>import("./pages/register/register.component").then((c)=>c.RegisterComponent) ,title:"register"},
        {path:"forget" ,canActivate:[loggedGuard],loadComponent:()=>import("./pages/forget-password/forget-password.component").then((c)=>c.ForgetPasswordComponent) ,title:"forget-password"}
    ]},
    {path:"" ,component:BlanckLayoutComponent ,title:"blank" ,children:[
        {path:"home" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/home/home.component").then((c)=>c.HomeComponent) ,title:"home"},
        {path:"cart" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent) ,title:"cart"},
        {path:"wishlist" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/wishlist/wishlist.component").then((c)=>c.WishlistComponent) ,title:"wish list"},
        {path:"brands" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent) ,title:"brands"},
        {path:"categories" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent) ,title:"categories"},
        {path:"products" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent) ,title:"products"},
        {path:"allorders" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent) ,title:"all orders"},
        {path:"details/:id" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/details/details.component").then((c)=>c.DetailsComponent) ,title:"details"},
        {path:"checkout/:id" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent) ,title:"checkout"},

        {path:"**" ,canActivate:[authGuard] ,loadComponent:()=>import("./pages/not-found/not-found.component").then((c)=>c.NotFoundComponent) ,title:"not-found"},
    ]},
    
];
