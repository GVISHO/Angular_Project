import { AsyncPipe } from '@angular/common';
import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService,AlertService,CartStateService, CartService } from '../../shared/services';
import { ProductPriceComponent } from '../../shared/ui';
import { EMPTY, catchError } from 'rxjs';
import { Product } from '../../shared/interfaces';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe,ProductPriceComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {
  private readonly router = inject(Router)
  private readonly productsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartStateService = inject(CartStateService)
  private readonly cartService = inject(CartService)
  private readonly alertService = inject(AlertService)
  readonly product$ = this.productsService
    .getSingleProductById(this.activatedRoute.snapshot.params['id'])
    .pipe(
      catchError(() => {
        this.router.navigateByUrl('404');
        return EMPTY;
      }),
    );
    addToCart(product: Product): void {
      const cartItem = { id: product._id, quantity: 1 };
      this.cartService.addOrUpdateCartItem(cartItem).pipe(
        catchError(error => {
          this.alertService.error(error.error);
          return EMPTY;
        })
      ).subscribe(() => {
        this.cartStateService.setCartVisibility(true);
      });
    }
}
