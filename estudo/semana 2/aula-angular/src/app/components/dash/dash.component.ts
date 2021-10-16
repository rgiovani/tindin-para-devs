import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  backPage(): Promise<boolean> {
    return this.router.navigate([
      'main'
    ])
  }

}
