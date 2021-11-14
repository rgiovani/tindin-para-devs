import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { iImage } from './../model/Image.model';
import { iMessage } from './../model/Message.model';

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

  public sendImage(data: iImage): Observable<any> {
    return this.httpClient.post(
      `${this.url}/chat/upload/img`,
      data
    )
  }

}
