import { Component, inject } from '@angular/core';
import { BackgroundImageRotatorDirective } from '../../shared/directives/background-image-rotator.directive';
import { ProductsService } from '../../shared/services';
import { AsyncPipe } from '@angular/common';
import { ProductsCarouselComponent } from '../../shared/ui/products-carousel/products-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BackgroundImageRotatorDirective,AsyncPipe,ProductsCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
 private readonly productsService = inject(ProductsService)
 readonly productsForCarousel$ = this.productsService.getProductsForCarousel()
}
