import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';

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

  public isTokenValid(): any {
    if (sessionStorage.getItem('token')) {
      return this.httpClient.get(`${this.url}/auth/validate`)
    }
  }

  public login(credentials: Credential): Observable<any> {
    return this.httpClient.post(`${this.url}/login`,
      {
        email: credentials.email,
        password: credentials.password
      })
  }

  public register(credentials: Credential): Observable<any> {
    return this.httpClient?.post(`${this.url}/register`,
      {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
  }

  public recover(credentials: Credential): Observable<any> {
    return this.httpClient?.post(`${this.url}/recover`,
      {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
  }

  public logout() {
    if (sessionStorage.getItem('token'))
      sessionStorage.removeItem('token')

  }

  public getToken(): string {
    return sessionStorage.getItem('token') ?? ''
  }

}
