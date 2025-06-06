import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    }
];
