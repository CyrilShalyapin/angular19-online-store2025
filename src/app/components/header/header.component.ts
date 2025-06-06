import { Component, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  cartCount = computed(() => this.cartService.cart().length)

  constructor(private cartService: CartService) {

  }
}
