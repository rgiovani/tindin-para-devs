import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  visible: boolean = false
  loading = false
  inputType = 'password'

  welcome = true
  login = false
  register = false

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private readonly snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', null],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  send(): any {
    if (this.loading) { return }

    this.loading = true

    if (!this.form.valid) {
      this.loading = false
      const { name, email, password } = this.form.value
      let fields = ''

      const type = (this.login) ? 'login' : 'cadastro'
      const message = `Preencha os campos para realizar o ${type}`

      return this.snackbar.open(message, '', {
        duration: 6000,
        panelClass: ['orange-snackbar']
      })
    }

    const data = this.form.getRawValue()
    this.loginService.login({ email: data.email, password: data.password }).subscribe(
      async (res: any) => {
        sessionStorage.setItem('token', res.token)
        return this.router.navigate(['/tasks'])
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

  setScreen(screen: string) {
    this.welcome = false
    if (screen === "login")
      this.login = true
    else if (screen === "register")
      this.register = true
    else {
      this.register = false
      this.login = false
      this.welcome = true
    }
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
