import { Component,Input, inject } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { ProductRatingStarsComponent } from '../product-rating-stars/product-rating-stars.component';
import { TextShorterPipe } from '../../pipes/text-shorter.pipe';
import { RouterLink } from '@angular/router';
import { CartStateService,CartService, AlertService } from '../../services';
import { EMPTY,catchError } from 'rxjs';


@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [ProductPriceComponent,ProductRatingStarsComponent,TextShorterPipe,RouterLink],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.css'
})
export class ProductPreviewComponent {
  @Input() Product:Product|null = null
  private readonly cartService = inject(CartService)
  private readonly cartStateService = inject(CartStateService)
  private readonly alertService = inject(AlertService)
  addToCart(): void {
    if (this.Product) {
      const cartItem = { id: this.Product._id, quantity: 1 };
      this.cartService.addOrUpdateCartItem(cartItem).pipe(catchError(error => {
        this.alertService.error(error.error);
        return EMPTY;
      })).subscribe(() => {
        this.cartStateService.setCartVisibility(true);
      });
    }
  }
}
