import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products')
  }

  getProductById(id: string): Observable<any> {
    return this.http.get('https://dummyjson.com/products/' + id)
  }
}
