import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-widget',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent {
  cartService = inject(CartService)
  router = inject(Router)

  subTotalPrice = this.cartService.subTotalPrice
  cartProductsCount = this.cartService.cartProductsCount
}
