import { Injectable } from '@angular/core';

import { WebSocketServiceService } from './web-socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  username: string = ''
  usersOnline: any[] = []
  constructor(
    private webSocketService: WebSocketServiceService
  ) {
    this.handleSockets()
  }

  public getUserName() {
    return this.username
  }

  public setUserName(username: string) {
    this.username = username
  }

  public getUsersOnline() {
    return this.usersOnline
  }

  public setUsersOnline(currentUsers: any[]) {
    this.usersOnline = currentUsers
  }

  handleSockets() {
    this.webSocketService.listen('user_disconnected').subscribe(data => {
      this.webSocketService.emit('user_left', data)
    })
  }


}
