import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Core/services/product.service';
import { IProduct } from '../../Core/interfaces/iproduct';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductService=inject(ProductService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService)

detailsProduct:IProduct|null=null;
customOptionsProdcut:OwlOptions= {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  rtl:true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout: 1000,
  autoplaySpeed: 1000,
  autoplayHoverPause: true,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {console.log(p.get('id'));
        let idProduct=p.get('id');

this._ProductService.getSpacifcProdcut(idProduct).subscribe({

next:(res)=>{console.log(res.data);
this.detailsProduct=res.data

},
error:(err)=>{console.log(err);}

})


      }
    })
  }



  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{console.log(res);
        this._ToastrService.success(res.message,"FreshCart")
        this._CartService.cartNumber.set(res.numOfCartItems)
      },error:(err)=>{console.log(err);
      }
    })
  }
}
