import { environment } from './../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber:WritableSignal<number>=signal(0)
  userId:WritableSignal<number>=signal(1)


  constructor(private _HttpClient: HttpClient) {}







  
  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      { productId: id },
    
    );
  }




  getProductsCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,{
    
    })
  }


  deleteSpacificCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
       
      }
    )
  }


  updateProductQuantity(id:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
  "count": newCount
      },{
      
      }
    )
  }


  clrCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
     
      }
    )
  }
}
