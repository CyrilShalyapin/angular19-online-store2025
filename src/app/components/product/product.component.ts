import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productId: string = '';

  product: any = {}

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
