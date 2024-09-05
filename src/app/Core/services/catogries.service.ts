import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatogriesService  {

  constructor(private _HttpClient:HttpClient) { }


  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecCategories(id:string|null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }


  
}