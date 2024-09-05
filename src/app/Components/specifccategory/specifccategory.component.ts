import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatogriesService } from '../../Core/services/catogries.service';
import { Icatogries } from '../../Core/interfaces/icatogries';

@Component({
  selector: 'app-specifccategory',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specifccategory.component.html',
  styleUrl: './specifccategory.component.scss'
})
export class SpecifccategoryComponent implements OnInit{
 
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _CatogriesService=inject(CatogriesService);


  catDetails:Icatogries={} as Icatogries

  ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next: (p) => {console.log(p.get('id'));
let idCat=p.get('id')




this._CatogriesService.getSpecCategories(idCat).subscribe({
  next: (res) => {console.log(res.data);

    this.catDetails=res.data
  },
  error: (err) => {console.log(err);},
})

  }
})

  }


}
