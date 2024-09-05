import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/services/cart.service';
import { Icart } from '../../Core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

private readonly _CartService=inject(CartService);

cartDetails:Icart={} as Icart

ngOnInit(): void {
  this._CartService.getProductsCart().subscribe({
    next: (res) => {console.log(res.data)
this.cartDetails=res.data

    },
    error: (err) => {console.error(err)},
  })
}

removItem(id:string):void{
  this._CartService.deleteSpacificCart(id).subscribe({

    next: (res) => {console.log(res)

      this.cartDetails=res.data

      this._CartService.cartNumber.set(res.numOfCartItems)
    }

  })
  
}






updateCount(id:string,count:number):void{
if(count>0){
  this._CartService.updateProductQuantity(id,count).subscribe({
    next: (res) => {console.log(res)
  
      this.cartDetails=res.data
  
    }
    ,error(err) {
      console.error(err);
    },
  })
}
}

clrItem():void{
  this._CartService.clrCart().subscribe({
    
    next: (res) => {console.log(res)
      if(res.message=='success'){
        this.cartDetails={} as Icart;


        this._CartService.cartNumber.set(0)

      }
    }
   
  })
}



}
