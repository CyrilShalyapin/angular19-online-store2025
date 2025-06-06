import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: WritableSignal<any[]> = signal([])

  addToCart(item: any) {
    console.log('here adding')
    this.cart.update(items => [...items, item])
  }

  constructor() { }
}
