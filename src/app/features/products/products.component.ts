import { Component,inject } from '@angular/core';
import { ProductsService } from '../../shared/services';
import { AsyncPipe } from '@angular/common';
import { ProductPreviewComponent } from '../../shared/ui/product-preview/product-preview.component';
import { ProductsCarouselComponent } from '../../shared/ui';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe,ProductPreviewComponent,ProductsCarouselComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productService = inject(ProductsService)
  readonly products$=this.productService.getProducts()
}
