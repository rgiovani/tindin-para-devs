import { ChatService } from './../../services/chat.service';
import { MessageService } from './../../services/messages.service';
import { WebSocketServiceService } from './../../services/web-socket-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from './../../services/login/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form!: FormGroup
  loading: boolean = false
  visible: boolean = false

  inputType: string = 'password'

  users = {}

  css = {
    loadIcon: {
      state: "p-6 flex justify-center hidden"
    }
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private readonly snackbar: MatSnackBar,
    private webSocketService: WebSocketServiceService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.handleSockets()
  }

  ngAfterViewInit() { }

  login(data: any) {
    const socketId: string = this.webSocketService.getSocketId()

    this.authService.login({ email: data.email, password: data.password, socketId: socketId }).subscribe(
      async (res: any) => {
        this.chatService.setUserName(res.username)
        this.chatService.setUsersOnline(res.usersOnline)
        sessionStorage.setItem('token', res.token)
        this.form.reset()
        return this.router.navigate(['/chat'])
      }, (err: any) => {
        this.loading = false
        return this.snackbar.open(
          err?.error?.message ? err.error.message : 'E-mail ou senha incorretos',
          '',
          { duration: 6000 }
        )
      }
    )
  }

  send(): any {
    if (this.loading) { return }
    this.loading = true
    this.css.loadIcon.state = this.css.loadIcon.state.replace('hidden', '')

    if (!this.form.valid) {
      this.loading = false
      this.css.loadIcon.state = "p-6 flex justify-center hidden"

      return this.snackbar.open('Preencha os campos para realizar o login', '', {
        duration: 6000,
        panelClass: ['orange-snackbar']
      })
    }

    const data = this.form.getRawValue()

    this.login(data)
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

  handleSockets() {
    this.webSocketService.listen('connection:sid').subscribe((data: any) => {
      if (sessionStorage.getItem('token')) {
        this.authService.isTokenValid(data.socketId, data.socketsOnline).subscribe(async (res: any) => {
          this.chatService.setUsersOnline(res.usersOnline)
          this.chatService.setUserName(res.username)

          this.router.navigate(['/chat'])
        }, (err: any) => {
          this.router.navigate(['/auth'])
        })
      }

      this.webSocketService.setSocketDataConnected({ socketId: data.socketId, socketsOnline: data.socketsOnline })
    })
  }

}
