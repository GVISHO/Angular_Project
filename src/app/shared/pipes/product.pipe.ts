import { Pipe, PipeTransform,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../services';
import { Product } from '../interfaces';
@Pipe({
  name: 'product',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  private readonly productService = inject(ProductsService);

  transform(id: string): Observable<Product | null> {
    return this.productService.getSingleProductById(id);
  }
}

