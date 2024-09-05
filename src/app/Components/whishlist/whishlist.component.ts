import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WhishlistService } from '../../Core/services/whishlist.service';
import { Iwhshlist } from '../../Core/interfaces/iwhshlist';
import { TermtextPipe } from '../../Core/pipes/termtext.pipe';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../Core/services/cart.service';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [RouterLink, TermtextPipe, CurrencyPipe],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.scss',
})
export class WhishlistComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute);

  private readonly _WhishlistService = inject(WhishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);

  wishListDetails: Iwhshlist[] = [];

  ngOnInit(): void {






    
    this._WhishlistService.getWhishListProduct().subscribe({
      next: (res) => {
        console.log(res.data);

        this.wishListDetails = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }






  
  deleteSpecProduct(id: string): void {
    this._WhishlistService.removeSpecProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('Product deleted successfully', 'Success');

        this._WhishlistService.getWhishListProduct().subscribe({
          next: (res) => {
            console.log(res);
            this.wishListDetails = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
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

}
