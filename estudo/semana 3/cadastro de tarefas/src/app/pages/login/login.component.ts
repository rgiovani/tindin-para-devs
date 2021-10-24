import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  visible: boolean = false
  loading = false
  inputType = 'password'
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  send(): any {
    if (this.loading) { return }

    this.loading = true

    if (!this.form.valid) {
      this.loading = false
      return this.snackbar.open('Preencha o e-mail e senha para realizar loin', '', {
        duration: 6000,
        panelClass: ['orange-snackbar']
      })
    }

    const data = this.form.getRawValue()
    this.loginService.login({ email: data.email, password: data.password }).subscribe(
      async (res: any) => {
        sessionStorage.setItem('aula-oath', res.token)
        return this.router.navigate(['/main'])
      },
      (err: any) => {
        this.loading = false
        return this.snackbar.open(
          err?.error?.message ? err.error.message : 'Ooops... Confira seu e-mail e senha',
          '',
          { duration: 6000 }
        )
      }
    )
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password'
      this.visible = false
    } else {
      this.inputType = 'text'
      this.visible = true
    }

    this.cd.markForCheck()
  }

}
