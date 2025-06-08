import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
// import { ProductsService } from '../../services/products.service';
import { NgOptimizedImage } from '@angular/common';
import { ProductsSearchComponent } from '../products-search/products-search.component';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage, ProductsSearchComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  cartService = inject(CartService)
  productsService = inject(ProductsService)

  allProductsLoaded = this.productsService.allProductsLoaded
  cartProducts = this.cartService.cartProducts
  products: Signal<any> = this.productsService.products

  loadMore() {
    this.productsService.loadMoreProducts()
  }

  ngOnInit() {
    this.productsService.getProducts()
  }
}
