import { AsyncPipe } from '@angular/common';
import { Component,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services';
import { EMPTY, catchError } from 'rxjs';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {
  private readonly router = inject(Router)
  private readonly productsService = inject(ProductsService)
  private readonly activatedRoute = inject(ActivatedRoute)
  readonly product$ = this.productsService
    .getSingleProductById(this.activatedRoute.snapshot.params['id'])
    .pipe(
      catchError(() => {
        this.router.navigateByUrl('404');
        return EMPTY;
      }),
    );
}
