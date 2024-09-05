import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrsersService } from '../../Core/services/orsers.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

private readonly _ActivatedRoute=inject(ActivatedRoute);
private readonly _OrsersService=inject(OrsersService)

orders:FormGroup =new FormGroup({
  details: new FormControl(null,[Validators.required,Validators.maxLength(20)]),
  phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required,Validators.maxLength(20)])
})
cartId:string|null="";
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
this.cartId=params.get('id')
console.log(this.cartId);

    },
    error(err) {
      console.error( err);
    },
  })
}



ordersubmit():void{
  console.log(this.orders.value);
  this._OrsersService.checkOut(this.cartId,this.orders.value).subscribe({
    next: (res) => {console.log(res);

      if(res.status==='success'){
        res.session.url;


        window.open(res.session.url)
      }
    },
    error(err) {
      console.error(err);
    },

  })
  
}


}
