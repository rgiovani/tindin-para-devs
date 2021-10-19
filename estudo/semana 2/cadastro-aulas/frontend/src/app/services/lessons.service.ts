import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ILessons } from '../model/lessons.model';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private readonly url = environment.url

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/lessons`)
  }


}
