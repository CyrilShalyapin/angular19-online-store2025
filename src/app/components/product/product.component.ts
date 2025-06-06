import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productId: string = '';

  product: any = {}

  cartService = inject(CartService)

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id') ?? ''
      this.productId = productId

      this.productsService.getProductById(productId).subscribe((product) => {
        this.product = product
      })
    })
  }

}
