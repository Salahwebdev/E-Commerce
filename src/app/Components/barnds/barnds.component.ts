import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../Core/services/brands.service';
import { Ibrand } from '../../Core/interfaces/ibrand';

@Component({
  selector: 'app-barnds',
  standalone: true,
  imports: [],
  templateUrl: './barnds.component.html',
  styleUrl: './barnds.component.scss'
})
export class BarndsComponent implements OnInit {

private readonly _BrandsService=inject(BrandsService)
brandsList:Ibrand[]=[]
ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe({
    next: (res) => {console.log(res.data)

      this.brandsList=res.data
    }

  })


  console.log('brandscomponet worked');
  
}
  showModal():boolean{
return true
  }
}
