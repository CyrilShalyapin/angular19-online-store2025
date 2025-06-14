import { computed, Injectable, signal } from '@angular/core';
import { filter, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryType, ProductType, SortMethod } from '../types/product.types';
import { toObservable } from '@angular/core/rxjs-interop';
import { DEFAULT_CATEGORY, DEFAULT_SORT_METHOD } from '../constants';

const PAGE_SIZE = 25

type SortMethodUrlType = 'sortBy=category&order=asc' | 'sortBy=price&order=asc' | 'sortBy=price&order=desc' | 'sortBy=title&order=asc'

const SORT_METHOD_TO_URL_MAP = new Map<SortMethod, SortMethodUrlType>()
  .set(SortMethod.Category, 'sortBy=category&order=asc')
  .set(SortMethod.PriceASC, 'sortBy=price&order=asc')
  .set(SortMethod.PriceDESC, 'sortBy=price&order=desc')
  .set(SortMethod.Title, 'sortBy=title&order=asc')


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) {}

  products = signal<ProductType[]>([])

  loadedProductsCount = computed<number>(() => {
    return this.products().length
  })

  totalProductsCount = signal<number>(0)
  searchQuery = signal<string>('')

  allProductsLoaded = computed<boolean>(() => {
    return this.loadedProductsCount() >= this.totalProductsCount()
  })

  category = signal<CategoryType>(DEFAULT_CATEGORY)
  sortMethod = signal<SortMethod>(DEFAULT_SORT_METHOD)

  private getProductsRequestUrl = computed<string>(() => {
    let url = 'https://dummyjson.com/products'

    if (this.searchQuery().length) {
      url = url + `/search?q=${this.searchQuery()}&limit=25`
      return url
    }

    if (this.category() !== 'all-categories') {
      url = url + `/category/${this.category()}`
    }

    url = url + `?limit=${PAGE_SIZE}`

    if (this.sortMethod()) {
      url = url + `&${SORT_METHOD_TO_URL_MAP.get(this.sortMethod() as SortMethod)}`
    }

    return url
  })

  getProducts(): void {
    this.http.get(this.getProductsRequestUrl()).subscribe((data: any) => {
      this.products.set(data.products)
      this.totalProductsCount.set(data.total)
    })
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`)
  }

  loadMoreProducts(): void {
    this.http.get(`${this.getProductsRequestUrl()}&skip=${this.loadedProductsCount()}`).subscribe((data: any) => {
      this.products.update(oldProducts => [...oldProducts, ...data.products])
    })
  }


  // For some reason Observable<Category[]> wont be ok with typescript
  getProductsCategoryList(): Observable<CategoryType[]> {
    return this.http.get('https://dummyjson.com/products/category-list') as Observable<CategoryType[]>
  }

  searchQuery$ = toObservable(this.searchQuery).pipe(filter(value => value !== '')).pipe(switchMap(value => {
    return this.http.get(`https://dummyjson.com/products/search?q=${value}&limit=25`)
  })).subscribe((data: any) => {
    this.products.set(data.products)
    this.totalProductsCount.set(data.total)
    console.log(data)
  })
}
