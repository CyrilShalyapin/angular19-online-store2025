import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductType } from '../../types/product.types';
import { httpResource } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product',
  imports: [MatProgressSpinner],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  cartService = inject(CartService)
  private route = inject(ActivatedRoute);
  readonly params: Signal<ParamMap | undefined> = toSignal(this.route.paramMap);
  productId = this.params()?.get('id');



  product = httpResource<ProductType>(
    () => `https://dummyjson.com/products/${this.productId}`,
    {
      defaultValue: {} as ProductType
    }
  )
}
