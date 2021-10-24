import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { iNotesCreate, iNotesDelete, iNotesEdit } from '../model/notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly url = environment.url

  constructor(private readonly httpClient: HttpClient) { }

  public createNote(data: iNotesCreate): Observable<any> {
    return this.httpClient.post(
      `${this.url}/notes`,
      data
    )
  }

  public editNote(data: iNotesEdit): Observable<any> {
    return this.httpClient.put(
      `${this.url}/notes`,
      data
    )
  }

  public getNote(id: string | null): Observable<any> {
    return this.httpClient.get(
      `${this.url}/notes/${id}`,
    )
  }

  public listNote(): Observable<any> {
    return this.httpClient.get(
      `${this.url}/notes`,
    )
  }
}
