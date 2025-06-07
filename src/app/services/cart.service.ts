import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: WritableSignal<Map<string, any>> = signal(new Map())

  cartProductsCount = computed(() => {
    let count = 0
    for (const [_key, product] of this.cartProducts()) {
      count += product.quantity
    }

    return count
  })

  subTotalPrice = computed(() => {
    let sum = 0
    for (const [_key, product] of this.cartProducts()) {
      sum += product.price * product.quantity
    }

    return sum
  })

  addProductToCart(product: any) {
    const products = this.cartProducts()

    if (!products.has(product.id)) {
      this.cartProducts.update((map) => new Map(map).set(product.id, {...product, quantity: 1}))
    } else {
      const cartProduct = products.get(product.id)
      cartProduct.quantity++
      this.cartProducts.update((map) => new Map(map).set(cartProduct.id, cartProduct))
    }
  }

  removeProductFromCart(productId: any) {
    const cartProduct = this.cartProducts().get(productId)
    if (cartProduct.quantity > 1) {
      cartProduct.quantity--
      this.cartProducts.update((map) => new Map(map).set(cartProduct.id, cartProduct))
    } else {
      this.deleteProductFromCartEntirely(productId)
    }

  } 

  deleteProductFromCartEntirely(productId: any) {
    const products = new Map(this.cartProducts())
    products.delete(productId)
    this.cartProducts.update(() => products)
  }

  constructor() { }
}
