import { Component,inject } from '@angular/core';
import { ProductPreviewComponent } from '../../shared/ui/product-preview/product-preview.component';
import { AsyncPipe } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services';
@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductPreviewComponent,AsyncPipe],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export default class CategoryProductsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);
  readonly products$ = this.productService.getProductsByCategory(this.activatedRoute.snapshot.params['category']).pipe(
    catchError(() => {
      this.router.navigateByUrl('404');
      return EMPTY;
    }),
  );
}
