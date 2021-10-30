import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { iTasksCreate, iTasksEdit } from '../../model/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly url = environment.url

  constructor(private readonly httpClient: HttpClient) { }

  public createTask(data: iTasksCreate): Observable<any> {
    return this.httpClient.post(
      `${this.url}/tasks`,
      data
    )
  }

  public editTask(data: iTasksEdit): Observable<any> {
    return this.httpClient.put(
      `${this.url}/tasks`,
      data
    )
  }

  public getTask(id: string | null): Observable<any> {
    return this.httpClient.get(
      `${this.url}/tasks/${id}`,
    )
  }

  public listTasks(): Observable<any> {
    return this.httpClient.get(
      `${this.url}/tasks`,
    )
  }
}
