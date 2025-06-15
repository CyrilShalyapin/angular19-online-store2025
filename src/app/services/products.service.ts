import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { CategoryType, ProductType, SortMethod } from '../types/product.types';
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

  http = inject(HttpClient)

  // productsResource = resource({
  //   request: () => ({url: this.getProductsRequestUrl()}),
  //   loader: async ({request, abortSignal}): Promise<ProductType[]> => {

  //     const jsonData = await fetch(request.url, {signal: abortSignal})
  //     const data = await jsonData.json()
  //     this.totalProductsCount.set(data.total)
  //     return data.products
  //   }
  // })

  productsResource = httpResource<ProductType[]>(
    () => this.getProductsRequestUrl(),
    {
      defaultValue: [],
      parse: (data: unknown) => {
        const parsedData = data as {products: ProductType[], total: number}
        this.totalProductsCount.set(parsedData.total)
        return parsedData.products
      }
    }
  )

  loadedProductsCount = computed<number>(() => {
    return this.productsResource.value()?.length ?? 0
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
      url = url + `/search?q=${this.searchQuery()}&limit=25&${SORT_METHOD_TO_URL_MAP.get(this.sortMethod() as SortMethod)}`
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

  loadMoreProducts(): void {
    this.http.get(`${this.getProductsRequestUrl()}&skip=${this.loadedProductsCount()}`).subscribe((data: any) => {
      this.productsResource.update(oldProducts => oldProducts ? [...oldProducts, ...data.products] : [data.products])
    })
  }
}
