import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input()isLogin:boolean=true
  constructor(private flowbiteService:FlowbiteService,private auth:AuthService,private cart:CartService,private translation:TranslationService){}
  numOfCratItems=computed(()=>this.cart.numOfCartItems())

  ngOnInit(): void {


   this.cart.getCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.cart.numOfCartItems.set(res.numOfCartItems)
      
    }
   })
  }

  logout(){
    this.auth.logout()
  }

  changeLang(){
    const lang=localStorage.getItem('lang')=='en' ? 'ar':'en' as string
    this.translation.changeLang(lang)
  }
}
