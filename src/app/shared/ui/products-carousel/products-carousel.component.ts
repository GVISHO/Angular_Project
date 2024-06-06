import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductRatingStarsComponent } from '../product-rating-stars/product-rating-stars.component';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { RouterLink } from '@angular/router';
import { TextShorterPipe } from '../../pipes/text-shorter.pipe';


@Component({
  selector: 'app-products-carousel',
  standalone: true,
  imports: [ProductRatingStarsComponent,ProductPriceComponent,RouterLink,TextShorterPipe],
  templateUrl: './products-carousel.component.html',
  styleUrl: './products-carousel.component.css'
})
export class ProductsCarouselComponent {
  @Input() Product: Product | null = null;
 
}
