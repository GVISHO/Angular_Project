import { Component,inject } from '@angular/core';
import { ProductsService } from '../../shared/services';
import { ProductPreviewComponent } from '../../shared/ui/product-preview/product-preview.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-discounted-products',
  standalone: true,
  imports: [ProductPreviewComponent,AsyncPipe],
  templateUrl: './discounted-products.component.html',
  styleUrl: './discounted-products.component.css'
})
export default class DiscountedProductsComponent {
  private readonly productService = inject(ProductsService)
  readonly products$=this.productService.getProducts()
}
