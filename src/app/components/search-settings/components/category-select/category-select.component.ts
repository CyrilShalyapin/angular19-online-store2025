import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CategoryType } from '../../../../types/product.types';
import { FormsModule } from '@angular/forms';
import { DEFAULT_CATEGORY } from '../../../../constants';

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
export class CategorySelectComponent implements OnInit {
  private productsService = inject(ProductsService)

  displayNamesMap = CATEGORY_DISPLAY_NAME_MAP

  selectedCategory = this.productsService.category()

  defaultCategory = DEFAULT_CATEGORY

  categories: CategoryType[] = []

  handleCategorySelect() {
    this.productsService.category.set(this.selectedCategory)
    this.productsService.getProducts()
  }

  ngOnInit(): void {
    this.productsService.getProductsCategoryList().subscribe((categories) => {
      this.categories = categories
    })
  }
}
