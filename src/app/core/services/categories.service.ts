import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }
  baseUrl:string=environment.baseUrl

  getCategories():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/categories`)
  }

  getSpecificCategories(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/categories/${id}`)
  }
}
