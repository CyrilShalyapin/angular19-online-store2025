import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, CartWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
