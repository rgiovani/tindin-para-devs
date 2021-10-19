import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
  ) { }

  ngOnInit(): void {
  }

  logout(): any {
    this.usersService.logout().subscribe((data: any) => {
      if (!!data.success) {
        this.usersService.setCurrentUserInfo(null)
        this.router.navigate([
          'login'
        ])
      }
    }, (apiError: any) => {
      console.log(apiError)
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })
  }

}
