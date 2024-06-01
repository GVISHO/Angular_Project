import { Component,inject } from '@angular/core';
import { ProductPreviewComponent } from '../../shared/ui/product-preview/product-preview.component';
import { AsyncPipe } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../shared/services';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [ProductPreviewComponent,AsyncPipe],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css'
})
export default class BrandProductsComponent   {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);
  readonly products$ = this.productService.getProductsByBrand(this.activatedRoute.snapshot.params['brand']).pipe(
    catchError(() => {
      this.router.navigateByUrl('404');
      return EMPTY;
    }),
  );

}
