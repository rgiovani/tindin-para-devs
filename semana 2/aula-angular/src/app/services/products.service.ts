import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private readonly url = environment.url

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getProducts(): Observable<any> {
    return this.httpClient.get(`${this.url}/products`)
  }
}
