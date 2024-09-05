import { IuserData } from './../../Core/interfaces/iuser-data';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../Core/services/mytranslate.service';
import { CartService } from '../../Core/services/cart.service';
import { jwtDecode } from 'jwt-decode';
import { TermtextPipe } from '../../Core/pipes/termtext.pipe';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule,TermtextPipe],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
 
 readonly _AuthService = inject(AuthService)
 private readonly _MytranslateService = inject(MytranslateService)
  readonly _TranslateService = inject(TranslateService)
 private readonly _CartService = inject(CartService)

navCartCount:Signal<number>=computed(()=>  this._CartService.cartNumber())
  userData: IuserData[] = [];
  user: any;

ngOnInit(): void {
  
  const tokenData = jwtDecode<any>(localStorage.getItem('userToken')!);
  this.userData = [tokenData]; 
  console.log('userData ', this.userData[0].name);
this.user=this.userData[0].name



this._CartService.getProductsCart().subscribe({
  next: (data) => {
    console.log('cart items',data);
    this._CartService.cartNumber.set(data.numOfCartItems)
    
  }
})



  }



 change(lang :string):void{
this._MytranslateService.changeLang(lang)
 }

}
