import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SearchSettingsComponent } from '../search-settings/search-settings.component';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage, SearchSettingsComponent, MatProgressSpinner],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  cartService = inject(CartService)
  productsService = inject(ProductsService)

  allProductsLoaded = this.productsService.allProductsLoaded
  cartProducts = this.cartService.cartProducts
  productsResource = this.productsService.productsResource

  loadMore() {
    this.productsService.loadMoreProducts()
  }
}
