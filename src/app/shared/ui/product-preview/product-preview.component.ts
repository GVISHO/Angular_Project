import { Component,Input, input } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { ProductRatingStarsComponent } from '../product-rating-stars/product-rating-stars.component';
import { TextShorterPipe } from '../../pipes/text-shorter.pipe';

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [ProductPriceComponent,ProductRatingStarsComponent,TextShorterPipe],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent {
  @Input() Product:Product|null = null
}
