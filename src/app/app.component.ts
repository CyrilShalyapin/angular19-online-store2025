import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CartButtonComponent } from './components/cart-button/cart-button.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, CartButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
