import { iMessage } from './../model/Message.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly url = environment.url
  constructor(private readonly httpClient: HttpClient) { }

  public sendMessage(data: iMessage): Observable<any> {
    return this.httpClient.post(
      `${this.url}/chat/messages`,
      data
    )
  }

  public listMessage(): Observable<any> {
    return this.httpClient.get(
      `${this.url}/chat/messages`,
    )
  }

}
