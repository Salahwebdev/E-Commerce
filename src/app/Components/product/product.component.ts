import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './../../Core/pipes/search.pipe';
import { SalePipe } from './../../Core/pipes/sale.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit, inject } from '@angular/core';
import { IProduct } from '../../Core/interfaces/iproduct';
import { ProductService } from '../../Core/services/product.service';
import { TermtextPipe } from '../../Core/pipes/termtext.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/services/cart.service';
import { WhishlistService } from '../../Core/services/whishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule,SearchPipe,TermtextPipe,SalePipe,RouterLink,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  x:any
  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
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
  
  private readonly _ProductService=inject(ProductService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  private readonly _WhishlistService=inject(WhishlistService);
allProduct:IProduct[]=[]
product: any;
text:string='';




  ngOnInit(): void {
  this._ProductService.getAllProduct().subscribe({
    next:(res)=>{console.log(res.data);
      this.allProduct=res.data
      
    }
  })
}




addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{console.log(res);
      this._ToastrService.success(res.message,"FreshCart");


      this._CartService.cartNumber.set(res.numOfCartItems)


      console.log(this._CartService.cartNumber());
      
    },error:(err)=>{console.log(err);
    }
  })
}









addWishList(id:string):void{
  this._WhishlistService.addToWishListProduct(id).subscribe({
    next:(res)=>{
      this.x=id
      console.log('idProduct',this.x);
      
      this._ToastrService.success(res.message,"FreshCart")
    },
    error:(err)=>{console.log(err);
    }
  })
}
}
