import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const PAGE_SIZE = 25

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  loadedProductsCount = signal<number>(0)
  totalProductsCount = signal<number>(0)

  constructor(private http: HttpClient) { }

  products = signal<any>([])

  allProductsLoaded = computed(() => {
    return this.loadedProductsCount() >= this.totalProductsCount()
  })

  filters = signal<any>({
    category: 'everything'
  })

  private baseProductRequestUrl = 'https://dummyjson.com/products'

  private categoryProductRequestUrl = computed(() => {
    let url = ''

    if (this.filters().category !== 'everything') {
      url = `/category/${this.filters().category}`
    }

    return url
  })

  private getProductsRequestUrl = computed(() => {
    return this.baseProductRequestUrl + this.categoryProductRequestUrl() + '?limit=' + PAGE_SIZE
  })

  getProducts(): void {
    this.http.get(this.getProductsRequestUrl()).subscribe((data: any) => {
      this.products.set(data.products)
      this.totalProductsCount.set(data.total)
      console.log(data)
    })

    this.loadedProductsCount.set(PAGE_SIZE)
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(this.baseProductRequestUrl + '/' + id)
  }

  loadMoreProducts(): void {
    this.http.get(`${this.getProductsRequestUrl()}&skip=${this.loadedProductsCount()}`).subscribe((data: any) => {
      this.products.update(oldProducts => [...oldProducts, ...data.products])
      console.log(data)
    })

    this.loadedProductsCount.update((currentCount) => currentCount + PAGE_SIZE)
  }

  getProductsCategoryList(): Observable<any> {
    return this.http.get(this.baseProductRequestUrl + '/category-list')
  }
}
