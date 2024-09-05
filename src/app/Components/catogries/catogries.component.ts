import { Subscription } from 'rxjs';
import { Icatogries } from './../../Core/interfaces/icatogries';
import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { CatogriesService } from '../../Core/services/catogries.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-catogries',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catogries.component.html',
  styleUrl: './catogries.component.scss'
})
export class CatogriesComponent  {

  private readonly _CatogriesService= inject(CatogriesService);
  private readonly _Router=inject(Router)
  private readonly _ActivatedRoute=inject(ActivatedRoute)

  catogriesList:Icatogries[]=[];
  getAllCatogriesSub !:Subscription;
catId:string|null=''
  ngOnInit(): void {
    this._CatogriesService.getAllCategories().subscribe({
      next: (res) => {console.log(res.data)
        this.catogriesList = res.data;
      },
      error: (error) => {console.error(error)}
    })
  }

  
}