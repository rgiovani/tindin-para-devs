import { ISocketDataConnected } from '../../model/SocketDataConnected';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Credential } from '../../model/Credential.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.url

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public sendHome(): Observable<any> {
    return this.httpClient.get(`${this.url}/auth`)
  }

  public isTokenValid(socketId: string, socketsOnline: ISocketDataConnected): Observable<any> {

    return this.httpClient.post(`${this.url}/auth/validate`, {
      socketId: socketId,
      socketsOnline: socketsOnline
    })
  }

  public login(credentials: Credential): Observable<any> {
    return this.httpClient.post(`${this.url}/login`,
      {
        email: credentials.email,
        password: credentials.password,
        socketId: credentials.socketId
      })
  }

  public getToken(): string {
    return sessionStorage.getItem('token') ?? ''
  }

}
