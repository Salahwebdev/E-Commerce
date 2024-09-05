import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../Core/services/product.service';
import { IProduct } from '../../Core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CatogriesService } from '../../Core/services/catogries.service';
import { Icatogries } from '../../Core/interfaces/icatogries';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { DatePipe, JsonPipe, LowerCasePipe, NgClass, SlicePipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../Core/pipes/sale.pipe';
import { TermtextPipe } from '../../Core/pipes/termtext.pipe';
import { SearchPipe } from '../../Core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WhishlistService } from '../../Core/services/whishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,SearchPipe,FormsModule,TermtextPipe,RouterLink,SalePipe,UpperCasePipe,LowerCasePipe,DatePipe,JsonPipe,SlicePipe,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {


 private readonly _ProductService= inject(ProductService);
 private readonly _CatogriesService= inject(CatogriesService);
 private readonly _CartService=inject(CartService);
 private readonly _ToastrService=inject(ToastrService);
 private readonly _NgxSpinnerService=inject(NgxSpinnerService);
 private readonly _WhishlistService=inject(WhishlistService);

productList:IProduct[]=[];
catogriesList:Icatogries[]=[];
getAllProductSub !:Subscription;
text:string='';
wishListDetails:string[]=[]

customOptionsCat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  rtl:true,
  autoplay:true,
  autoplayTimeout: 1000,
  autoplaySpeed: 1000,
  autoplayHoverPause: true,
  dots: false,
  navSpeed: 700,
  navText: [' ', ''],
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
 
this._CatogriesService.getAllCategories().subscribe({
 
  next: (res) => {
    console.log(res.data);
    this.catogriesList = res.data;
   


  }

})

  this.getAllProductSub=this._ProductService.getAllProduct().subscribe({
    next:(res)=>{console.log(res.data);

      this.productList=res.data
    }
  })


  
this._WhishlistService.getWhishListProduct().subscribe({
  next:(res)=>{
    const newData = res.data.map((item: any) => item._id);
        this.wishListDetails = newData;
  }
})

  
}


ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
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
     this.wishListDetails=res.data
      console.log('idProduct',this.wishListDetails);
      
      this._ToastrService.success(res.message,"FreshCart")
    },
    error:(err)=>{console.log(err);
    }
  })
}












}


