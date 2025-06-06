import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
// import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  products: any[] = [
    {
      title: 'Phone'
    },
    {
      title: 'Tablet'
    }
  ]

  cartService = inject(CartService)

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((data) => {
      console.log(data)
      this.products = data.products
    })
  }
}
