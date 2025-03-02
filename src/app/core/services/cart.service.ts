import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // numOfCartItems:BehaviorSubject<number>=new BehaviorSubject(0)
  numOfCartItems:WritableSignal<number>=signal(0)


  constructor(private http:HttpClient) { }
  baseUrl:string=environment.baseUrl


  addToCart(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/cart`,
      {
      "productId": id
  }
)
  }

  getCart():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/cart`)
  }


  removeCartItem(productId:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/cart/${productId}`)
  }

  updateProductQuantity(productId:string,count:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/api/v1/cart/${productId}`,
      {
      "count": count
  }
)
  }

  clearCart():Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/cart`)
  }
}
