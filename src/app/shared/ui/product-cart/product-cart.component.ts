import { Component,Input } from '@angular/core';
import { ProductRatingStarsComponent } from '../product-rating-stars/product-rating-stars.component';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { Product } from '../../interfaces';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [ProductRatingStarsComponent,ProductPriceComponent],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Input() Product: Product | null = null;
}
