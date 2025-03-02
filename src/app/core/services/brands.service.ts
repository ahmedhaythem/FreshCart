import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl:string=environment.baseUrl
  

  constructor(private http:HttpClient) { }

  getAllBrands():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/brands`)
  }

}
