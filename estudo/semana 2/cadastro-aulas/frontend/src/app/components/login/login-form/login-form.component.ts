import { IUser } from './../../../../../../api/types/IUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formUser: FormGroup = new FormGroup({})
  loginInfo: any = { success: false }

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formUser = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }

  onSubmit() {
    this.login(this.formUser.value)
  }

  login(inputs: any): any {
    this.usersService.login(inputs).subscribe((data: any) => {
      if (!!data.success) {
        this.router.navigate([
          'main'
        ])
      }
    }, (apiError: any) => {
      let message = ""
      if (apiError.error?.message) {
        message = apiError.error?.message
      }
      window.alert(message);
    })

    this.formUser.reset()
  }

}
