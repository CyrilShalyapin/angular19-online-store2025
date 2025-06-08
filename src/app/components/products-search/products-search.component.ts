import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { ProductCategoryType } from '../../types/product.types';
import { DEFAULT_PRODUCT_CATEGORY } from '../../constants';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.css'
})
export class ProductsSearchComponent implements OnInit {
  productsCategoryList: ProductCategoryType[] = []
  productsService = inject(ProductsService)

  sortsList = [
    {
      displayName: 'category',
      value: 'category&order=asc'
    },
    {
      displayName: 'price (low to high)',
      value: 'price&order=asc'
    },
    {
      displayName: 'price (high to low)',
      value: 'price&order=desc'
    },
    {
      displayName: 'name',
      value: 'title&order=asc'
    },
  ]

  selectedSort = 'category&order=asc'

  selectedCategory: ProductCategoryType = DEFAULT_PRODUCT_CATEGORY

  handleCategorySelect() {
    this.productsService.category.set(this.selectedCategory)
    this.productsService.getProducts()
  }

  handleSortSelect() {
    this.productsService.searchParams.update((searchParams) => {
      return {...searchParams, sortBy: this.selectedSort}
    })
    this.productsService.getProducts()
  }

  ngOnInit(): void {
    this.productsService.getProductsCategoryList().subscribe((data) => {
      this.productsCategoryList = data
    })
  }
}
