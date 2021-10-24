import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Credential } from '../model/Credential.model'


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = environment.url

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public login(credentials: Credential): Observable<any> {
    return this.httpClient.post(`${this.url}/login`,
      {
        email: credentials.email,
        password: credentials.password
      })
  }
}
