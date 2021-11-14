import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChatService } from './../../services/chat.service';
import { AuthService } from './../../services/login/auth.service';
import { WebSocketServiceService } from './../../services/web-socket-service.service';
import { MessageService } from './../../services/messages.service';

interface IImage {
  name: string,
  file: any,
  url: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  textValue = ''
  username: any = ''
  messages: any = []
  users: any = []

  fileName = '';
  apiUrl: string = 'http://localhost:3000'
  images: any

  constructor(
    private readonly router: Router,
    private webSocketService: WebSocketServiceService,
    private chatService: ChatService,
    private readonly authService: AuthService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/auth'])
    }
  }

  ngOnInit(): void {
    this.messageService.listMessage().subscribe(async (res: any) => {
      res.find((message: any) => {
        message.time = this.getDateTime(message.createdAt)
      })
      this.orderMessages(res)
    })

    this.username = this.chatService.getUserName()
    this.users = this.chatService.getUsersOnline()

    this.handleSockets()
  }

  send(text: string) {
    const { socketDataConnected } = this.webSocketService
    this.textValue = ''
    this.messageService.sendMessage({ text: text, socketId: socketDataConnected.socketId }).subscribe(async (res: any) => { })
  }

  uploadImage(event: any) {
    const url = this.apiUrl + '/chat/upload/img?socketId=' + this.webSocketService.getSocketId()
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.images = file
    }

    const formData = new FormData()
    formData.append('image-file', this.images)

    this.http.post<any>(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  logout() {
    sessionStorage.removeItem('token')
    window.location.reload()
  }

  getDateTime(date: any) {
    let today = new Date()
    let currentUserDay = today.getDate();
    let currentUserMonth = today.getMonth() + 1;
    let currentUserYear = today.getFullYear();

    date = new Date(date)
    let userDay = date.getDate();
    let userMonth = date.getMonth() + 1;
    let userYear = date.getFullYear();

    let message

    if (userDay == currentUserDay && userMonth == currentUserMonth && userYear == currentUserYear) {
      message = 'hoje'
    } else if (userDay == currentUserDay - 1 && userMonth == currentUserMonth && userYear == currentUserYear) {
      message = 'ontem'
    } else {
      message = `${userDay}/${userMonth}/${userYear}`
    }

    let time = {
      hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      msg: message
    }

    return time
  }

  handleSockets() {
    this.webSocketService.listen('list_users').subscribe((data: any) => {
      if (data) {
        data = JSON.parse(data)
        this.chatService.setUsersOnline(data.usersOnChat)
        this.users = this.chatService.getUsersOnline()
      }
    })

    this.webSocketService.listen('user_connected').subscribe(
      (data: any) => {
        if (data) {
          data = JSON.parse(data)
          this.chatService.setUsersOnline(data.usersOnChat)
          this.users = this.chatService.getUsersOnline()
        }
      })

    this.webSocketService.listen('message').subscribe((data: any) => {
      data.time = this.getDateTime(new Date())
      this.orderMessages(this.messages)
      this.messages.push(data)
      this.orderMessages(this.messages)
    })
  }

  orderMessages(data: any) {
    let length = data.length
    let tmp = []
    do {
      length--
      tmp.push(data[length])
    } while (length > 0)
    this.messages = tmp
  }

}
