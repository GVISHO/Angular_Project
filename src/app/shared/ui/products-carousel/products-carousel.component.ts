import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductRatingStarsComponent } from '../product-rating-stars/product-rating-stars.component';
import { ProductPriceComponent } from '../product-price/product-price.component';


@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [ProductRatingStarsComponent,ProductPriceComponent],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselComponent {
  @Input() Product: Product | null = null;
 
}
