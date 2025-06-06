import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: WritableSignal<any[]> = signal([])

  totalPrice = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.price, 0)
  })

  addToCart(item: any) {
    this.cartItems.update(items => [...items, item])
  }

  constructor() { }
}
