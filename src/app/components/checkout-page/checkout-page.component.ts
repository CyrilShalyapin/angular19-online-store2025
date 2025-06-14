import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  formState = new FormGroup({
    city: new FormControl('Minsk', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    postalCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.required]),
    fullname: new FormControl('', [Validators.required, Validators.minLength(1)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })
}
