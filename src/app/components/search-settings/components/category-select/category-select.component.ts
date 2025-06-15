import { Component, inject, OnInit, resource } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CategoryType } from '../../../../types/product.types';
import { FormsModule } from '@angular/forms';
import { DEFAULT_CATEGORY } from '../../../../constants';
import { httpResource } from '@angular/common/http';

const CATEGORY_DISPLAY_NAME_MAP = new Map<CategoryType, string>()
  .set('all-categories', "All Categories")
  .set('beauty', "Beauty")
  .set("fragrances", "Fragrances")
  .set("furniture", "Furniture")
  .set("groceries", "Groceries")
  .set("home-decoration", "Home Decoration")
  .set("kitchen-accessories", "Kitchen Accessories")
  .set("laptops", "Laptops")
  .set("mens-shirts", "Mens Shirts")
  .set("mens-shoes", "Mens Shoes")
  .set("mens-watches", "Mens Watches")
  .set("mobile-accessories", "Mobile Accessories")
  .set("motorcycle", "Motorcycle")
  .set("skin-care", "Skin Care")
  .set("smartphones", "Smartphones")
  .set("sports-accessories", "Sports Accessories")
  .set("sunglasses", "Sunglasses")
  .set("tablets", "Tablets")
  .set("tops", "Tops")
  .set("vehicle", "Vehicle")
  .set("womens-bags", "Womens Bags")
  .set("womens-dresses", "Womens Dresses")
  .set("womens-jewellery", "Womens Jewellery")
  .set("womens-shoes", "Womens Shoes")
  .set("womens-watches", "Womens Watches")

@Component({
  selector: 'app-category-select',
  imports: [FormsModule],
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.css'
})
export class CategorySelectComponent {
  private productsService = inject(ProductsService)

  displayNamesMap = CATEGORY_DISPLAY_NAME_MAP
  defaultCategory = DEFAULT_CATEGORY

  // categoriesResource = resource({
  //   loader: async (): Promise<CategoryType[]> => {
  //     const response = await fetch('https://dummyjson.com/products/category-list')
  //     const categoryList = await response.json()
  //     return [DEFAULT_CATEGORY, ...categoryList]
  //   },
  //   defaultValue: [DEFAULT_CATEGORY]
  // })

  categoriesResource = httpResource<CategoryType[]>(
    () => 'https://dummyjson.com/products/category-list',
    {
      defaultValue: [DEFAULT_CATEGORY],
      parse: (data) => {
        return [DEFAULT_CATEGORY, ...data as CategoryType[]]
      }
    }
  )

  handleCategorySelect(event: Event) {
    this.productsService.category.set((event.target as HTMLInputElement).value as CategoryType)
  }
}
