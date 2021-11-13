import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

import { WebSocketServiceService } from './../../services/web-socket-service.service';
import { MessageService } from './../../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: any = ''
  messages: any = []
  users: any = []

  constructor(
    private webSocketService: WebSocketServiceService,
    private chatService: ChatService,
    private messageService: MessageService
  ) { }

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
    this.messageService.sendMessage({ text: text, socketId: socketDataConnected.socketId }).subscribe(async (res: any) => {

    })
  }

  sendImage() { }

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
      message = 'antigo'
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
