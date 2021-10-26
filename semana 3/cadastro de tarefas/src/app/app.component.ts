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
    //this.router.navigate(['/login'])
  }
}
