import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const PAGE_SIZE = 25

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  loadedProducts: number = 0
  totalProducts: number = 0

  constructor(private http: HttpClient) { }

  products = signal<any>([])
  isNoMore = signal<boolean>(false)

  getProducts(): void {
    this.loadedProducts += PAGE_SIZE

    this.http.get('https://dummyjson.com/products?limit=' + PAGE_SIZE).subscribe((data: any) => {
      this.products.set(data.products)
      this.totalProducts = data.total
    })
  }

  getProductById(id: string): Observable<any> {
    return this.http.get('https://dummyjson.com/products/' + id)
  }

  loadMoreProducts(): void {
    this.loadedProducts += PAGE_SIZE
    if (this.loadedProducts + PAGE_SIZE > this.totalProducts) {
      this.isNoMore.set(true)
    }

    this.http.get(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${this.loadedProducts}`).subscribe((data: any) => {
      this.products.update(oldProducts => [...oldProducts, ...data.products])
    })
  }
}
