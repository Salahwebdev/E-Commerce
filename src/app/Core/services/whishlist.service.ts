import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iwhshlist } from '../interfaces/iwhshlist';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

myheadrs:any={token:localStorage.getItem('userToken')}
  constructor(private _HttpClient:HttpClient) { }


addToWishListProduct(id:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
    productId:id
  },
  {
    headers:this.myheadrs
  }
)
}

getWhishListProduct():Observable<any>{
 return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,
  {
    headers:this.myheadrs
  }
 )
}
  

removeSpecProduct(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,
    {
      headers:this.myheadrs
    }
  )
}
}
