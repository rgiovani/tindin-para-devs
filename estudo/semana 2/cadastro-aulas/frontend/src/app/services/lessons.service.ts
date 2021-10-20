import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private readonly url = environment.url

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  createLesson(lesson: any): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/lesson`, { email: lesson.title, password: lesson.description })
      .pipe(
        map(response => response),
        catchError((e: any) => {
          return throwError(e);
        })
      )
  }

  getAllLessons(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/lessons`)
  }


}
