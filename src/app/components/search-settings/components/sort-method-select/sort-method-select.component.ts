import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortMethod } from '../../../../types/product.types';
import { ProductsService } from '../../../../services/products.service';

const SORT_METHODS_LIST: {
  displayName: string
  value: SortMethod
}[] = [
  {
    displayName: 'Category',
    value: SortMethod.Category,
  },
  {
    displayName: 'Price (low to high)',
    value: SortMethod.PriceASC,
  },
  {
    displayName: 'Price (high to low)',
    value: SortMethod.PriceDESC,
  },
  {
    displayName: 'Name',
    value: SortMethod.Title,
  },
]

@Component({
  selector: 'app-sort-method-select',
  imports: [FormsModule],
  templateUrl: './sort-method-select.component.html',
  styleUrl: './sort-method-select.component.css'
})
export class SortMethodSelectComponent {
  sortMethodsList = SORT_METHODS_LIST

  productsService = inject(ProductsService)

  selectedSortMethod = this.productsService.sortMethod()

  handleSortMethodSelect() {
    console.log(this.selectedSortMethod);
    this.productsService.sortMethod.set(this.selectedSortMethod)
  }
}
