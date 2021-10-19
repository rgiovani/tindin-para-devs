import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http'

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly url = environment.url

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/users`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(
          'Something bad happened; please try again later.' + error)
      })
    )
  }

  login(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/user/login`, { email: user.email, password: user.password })
      .pipe(
        map(response => response),
        catchError((e: any) => {
          return throwError(e);
        })
      )
  }


}
