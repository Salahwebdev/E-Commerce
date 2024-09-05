import { IuserData } from './../../Core/interfaces/iuser-data';
import { OrsersService } from './../../Core/services/orsers.service';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Core/services/auth.service';
import { Icart } from '../../Core/interfaces/icart';
import { jwtDecode } from 'jwt-decode';
import { Iorders } from '../../Core/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
private readonly _AuthService=inject(AuthService) 
private readonly _OrsersService=inject(OrsersService)

cartDetails:Icart={} as Icart

orderData:Iorders[]= []




 tokenData:any = jwtDecode<any>(localStorage.getItem('userToken')!);

 ngOnInit(): void {


  console.log('userid',this.tokenData.id);
  
  
  this._AuthService.saveUserData()


  this._OrsersService.getUserOrder(this.tokenData.id).subscribe({

    next: (res) => {console.log('respons of cart shipiing',res);

      this.orderData=res

      console.log('orderData',this.orderData);

    },

    error: (err) => {console.log(err);

    }
  })
}

}
