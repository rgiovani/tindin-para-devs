import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

import { AuthService } from '../../services/login/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form!: FormGroup

  visible: boolean = false
  isRecoveringPass: boolean = false
  loading: boolean = false

  welcome: boolean = true
  login: boolean = false
  register: boolean = false

  inputType: string = 'password'

  UIText = {
    title: 'Vamos começar',
    name: 'Informe o seu nome',
    email: 'Informe o seu e-mail',
    password: 'Digite uma senha',
    btnSubmit: 'Entrar'
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
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

    this.reloadUiText()
  }

  reloadUiText() {
    this.UIText = {
      title: (!this.isRecoveringPass) ? 'Vamos começar' : 'Vamos redefinir a sua senha',
      name: 'Informe o seu nome',
      email: (!this.isRecoveringPass) ? 'Informe o seu e-mail' : 'Informe o e-mail cadastrado',
      password: (!this.isRecoveringPass) ? 'Digite uma senha' : 'Digite uma nova senha',
      btnSubmit: (!this.isRecoveringPass) ? 'Entrar' : 'Confirmar'
    }
  }

  send(): any {
    if (this.loading) { return }

    this.loading = true

    if (!this.form.valid) {
      this.loading = false

      const type = (!!this.login) ? 'login' : 'cadastro'
      const message = `Preencha os campos para realizar o ${type}`

      return this.snackbar.open(message, '', {
        duration: 6000,
        panelClass: ['orange-snackbar']
      })
    }


    const data = this.form.getRawValue()
    if (this.login) {
      this.authService.login({ email: data.email, password: data.password }).subscribe(
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
    } else {
      this.authService.register({ name: data.name, email: data.email, password: data.password }).subscribe(
        async (res: any) => {
          this.login = true
          this.register = false
          this.loading = false
          this.send()
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
  }

  logout() {
    this.login = false
    this.register = false
    this.isRecoveringPass = false
    this.welcome = true
    this.authService.logout()
  }

  setScreen(screen: string) {
    this.form.reset()
    this.welcome = false
    if (screen === "login")
      this.login = true
    else {
      this.reloadUiText()
      if (screen === "register") {
        this.register = true
        this.isRecoveringPass = false
      } else if (screen === "return") {
        if (this.isRecoveringPass) {
          this.login = true
          this.welcome = false
        } else {
          this.login = false
          this.welcome = true
        }

        this.isRecoveringPass = false
        this.register = false
      }
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

  toggleForgotPasswordScreen() {
    this.isRecoveringPass = true
    this.register = true

    this.reloadUiText()
  }

}
