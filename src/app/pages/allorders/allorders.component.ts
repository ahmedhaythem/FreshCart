import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CurrencyPipe, JsonPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  ordersList:any;
  cartItems:any;
  constructor(private orders:OrdersService){}
  ngOnInit(): void {
    this.getUserOrders()
  }

  getUserOrders(){
    this.orders.getUserOrder().subscribe({
      next:(res)=>{
        console.log(res);
        this.ordersList=res
        console.log(this.ordersList);
        

      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
