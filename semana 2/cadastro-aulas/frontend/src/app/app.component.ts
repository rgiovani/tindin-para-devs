import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private readonly router: Router, private elementRef: ElementRef) {

  }
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#A89FE9';
  }

  ngOnInit(): void {
    this.router.navigate([
      'login'
    ])
  }


  title = 'Cadastro de aulas';
}
