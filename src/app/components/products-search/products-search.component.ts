import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-search',
  imports: [FormsModule],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.css'
})
export class ProductsSearchComponent implements OnInit {
  productsCategoryList = []
  productsService = inject(ProductsService)

  selectedCategory = 'everything'

  handleCategorySelect() {
    this.productsService.filters.update((currentFilters) => {
      return {...currentFilters, category: this.selectedCategory}
    })
    this.productsService.getProducts()
  }

  ngOnInit(): void {
    this.productsService.getProductsCategoryList().subscribe((data) => {
      this.productsCategoryList = data
    })
  }
}
