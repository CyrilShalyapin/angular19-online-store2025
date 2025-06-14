import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  private productService = inject(ProductsService)

  searchQuery = this.productService.searchQuery()

  handleSearchInput() {
    this.productService.searchQuery.set(this.searchQuery)
    if (this.searchQuery === '') {
      this.handleClearSearchInput()
    }
  }

  handleClearSearchInput() {
    this.searchQuery = ''
    this.productService.searchQuery.set('')
    this.productService.getProducts()
  }
}
