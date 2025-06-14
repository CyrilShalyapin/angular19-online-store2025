import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsListComponent
    },
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: 'checkout',
        component: CheckoutPageComponent
    }
];
