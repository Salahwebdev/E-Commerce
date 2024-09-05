import { jwtDecode } from 'jwt-decode';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrsersService {
  tokenData: any = null;

  constructor(private _HttpClient: HttpClient) {}

  
  private readonly _AuthService = inject(AuthService);

  checkOut(idCart: string | null, shippingDeatils: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,

      {
        shippingAddress: shippingDeatils,
      },
    
    );
  }

  getUserOrder(idUser: string | null): Observable<any> {


    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${idUser}`
    );
  }
}
