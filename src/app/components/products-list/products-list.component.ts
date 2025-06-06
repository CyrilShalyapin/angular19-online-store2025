import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
// import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  cartService = inject(CartService)
  productsService = inject(ProductsService)

  products: Signal<any> = this.productsService.products
  isNoMore: Signal<boolean> = this.productsService.isNoMore

  loadMore() {
    this.productsService.loadMoreProducts()
  }

  ngOnInit() {
    this.productsService.getProducts()
  }
}
