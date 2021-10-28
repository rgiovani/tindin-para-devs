import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Curso Do Back ao Front';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    //verificar se ja existe um token e logar o usuario
    this.router.navigate(['/auth'])
  }
}
