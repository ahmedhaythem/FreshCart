import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl:string=environment.baseUrl
  token:string=localStorage.getItem('userToken') as string
  userData:any=jwtDecode(this.token)
  constructor(private http:HttpClient) { }
  
  
  

  onlinePayment(cartId:string,formData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        "shippingAddress":formData
    },{
      headers:{
        token:this.token
      }
    }
    )
  }

  getUserOrder():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/orders/user/${this.userData.id}`)
  }
}
