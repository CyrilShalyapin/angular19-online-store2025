import { computed, Injectable, signal } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductCategoryType, ProductType } from '../types/product.types';
import { DEFAULT_PRODUCT_CATEGORY } from '../constants';
import { toObservable } from '@angular/core/rxjs-interop';

const PAGE_SIZE = 25

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) {}

  products = signal<ProductType[]>([])

  loadedProductsCount = signal<number>(0)
  totalProductsCount = signal<number>(0)

  searchQuery = signal<string>('')

  allProductsLoaded = computed<boolean>(() => {
    return this.loadedProductsCount() >= this.totalProductsCount()
  })

  category = signal<ProductCategoryType>(DEFAULT_PRODUCT_CATEGORY)

  searchParams = signal<any>({
    category: 'everything',
    sortBy: 'category&order=asc',
  })

  private baseProductRequestUrl = 'https://dummyjson.com/products'

  private categoryProductRequestUrl = computed(() => {
    let url = ''

    if (this.category() !== 'all-categories') {
      url = `/category/${this.category()}`
    }

    return url
  })

  private sortByUrl = computed(() => {
    return `?sortBy=${this.searchParams().sortBy}`
  })

  private getProductsRequestUrl = computed(() => {
    return this.baseProductRequestUrl + this.categoryProductRequestUrl() + this.sortByUrl() + '&limit=' + PAGE_SIZE
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

  searchQuery$ = toObservable(this.searchQuery).pipe(switchMap(value => {
    return this.http.get(`https://dummyjson.com/products/search?q=${value}&limit=25`)
  })).subscribe((data: any) => {
    this.products.set(data.products)
    this.totalProductsCount.set(data.total)
    console.log(data)
  })
}
