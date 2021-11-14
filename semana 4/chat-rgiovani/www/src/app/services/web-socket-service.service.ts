import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client'

import { ISocketDataConnected } from '../model/SocketDataConnected';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  socket: any
  username: string = 'Unknown'
  usersOnline: any

  socketDataConnected: ISocketDataConnected = {
    socketId: '',
    socketsOnline: []
  }

  readonly url: string = 'http://localhost:3000'
  constructor() {
    this.socket = io(this.url)
  }

  getSocketId() {
    return this.socketDataConnected.socketId
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data)
  }

  setSocketDataConnected(socketDataConnected: ISocketDataConnected) {
    this.socketDataConnected = socketDataConnected
  }

}
