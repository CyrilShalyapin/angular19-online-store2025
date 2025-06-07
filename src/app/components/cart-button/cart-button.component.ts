import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-button',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent {
  cartService = inject(CartService)

  subTotalPrice = this.cartService.subTotalPrice
  cartProductsCount = this.cartService.cartProductsCount
}
