import { Component, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
// import { ProductsService } from '../../services/products.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  cartService = inject(CartService)
  productsService = inject(ProductsService)

  cartProducts = this.cartService.cartProducts
  products: Signal<any> = this.productsService.products
  isNoMore: Signal<boolean> = this.productsService.isNoMore

  loadMore() {
    this.productsService.loadMoreProducts()
  }

  ngOnInit() {
    this.productsService.getProducts()
  }
}
