import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducts } from 'src/app/model/products.model';

import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  dashList: any[] = [
    { active: true, name: 'primeiro ativo' },
    { active: false, name: 'segundo desativado' },
    { active: true, name: 'terceiro ativo' }
  ]

  constructor(
    private readonly router: Router,
    private readonly productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: IProducts) => {
      console.log(res.products)
    })
  }

  backPage(): Promise<boolean> {
    return this.router.navigate([
      'main'
    ])
  }

}
