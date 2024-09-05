import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // httpclinte-----import to appconfig
  private readonly _Httpclinte = inject(HttpClient);
  private readonly _Router = inject(Router);

  userData: any = null;
 
  
  setRegisterForm(data: object): Observable<any> {
    return this._Httpclinte.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  setloginForm(data: object): Observable<any> {
    return this._Httpclinte.post(
      ` ${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      
      
      console.log('userdata', this.userData);
 
    }
  }

logOut():void{
  localStorage.removeItem('userToken');
  this.userData = null;
this._Router.navigate(['/login'])
}

setEmailVerfiy(data:object):Observable<any>{
  return this._Httpclinte.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}



setcodeVerfiy(data: any): Observable<any> {
  const formattedData = { resetCode: data.restCode }; // Adjust according to backend needs
  console.log('Formatted data being sent to API:', formattedData); // Log data being sent
  return this._Httpclinte.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, formattedData);
}




setRestPassword(data:object):Observable<any>{
  return this._Httpclinte.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}



}
