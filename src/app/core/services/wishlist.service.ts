import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  baseUrl:string=environment.baseUrl

  constructor(private http:HttpClient) { }

  addToWishlist(id:string):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
    }
    )
  }

  getWishlist():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/wishlist`)
  }

  removeFromWishlist(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/api/v1/wishlist/${id}`)
  }

}
