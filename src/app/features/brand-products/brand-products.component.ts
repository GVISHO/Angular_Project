import { Component, inject } from '@angular/core';
import { ProductPreviewComponent } from '../../shared/ui/product-preview/product-preview.component';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, EMPTY, catchError, filter, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from '../../shared/services';
import { Products } from '../../shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [ProductPreviewComponent, AsyncPipe],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export default class BrandProductsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);

  readonly #products$ = new BehaviorSubject<Products | null>(null);
  readonly products$ = this.#products$.asObservable();

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          let snapshopt = this.activatedRoute.snapshot;

          while (snapshopt.firstChild) {
            snapshopt = snapshopt.firstChild;
          }

          this.productService
            .getProductsByBrand(snapshopt.params['brand'])
            .pipe(
              tap((response) => {
                this.#products$.next(response);
              }),
              catchError(() => {
                this.router.navigateByUrl('404');
                return EMPTY;
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
  }
}