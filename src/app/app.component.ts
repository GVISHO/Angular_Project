import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
// import { HomeComponent } from './features/home/home.component';
import { BackgroundImageRotatorDirective } from './shared/directives/background-image-rotator.directive';
import { HttpClientModule } from '@angular/common/http';
import { CartStateService,CartService, AlertService } from './shared/services';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsService } from './shared/services';
import { AsyncPipe } from '@angular/common';
import { Product } from './shared/interfaces';
import { ProductCartComponent } from './shared/ui/product-cart/product-cart.component';
import { ProductPipe } from './shared/pipes/product.pipe';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,BackgroundImageRotatorDirective,HttpClientModule,AsyncPipe,ProductCartComponent,ProductPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  readonly cartService = inject(CartService)
  readonly cartStateService = inject(CartStateService);
  private readonly productService = inject(ProductsService)
  private readonly alertService = inject(AlertService)
  title = 'Project_2';
  isCartVisible = false;
  ngOnInit(): void {
    this.cartService.init();
    this.cartStateService.cartVisible$.subscribe(isVisible => {
      this.isCartVisible = isVisible;
    });
  }

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }
  closeCart(): void {
    this.cartStateService.setCartVisibility(false);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return;
    const cartItem = { id: productId, quantity };
    this.cartService.updateCartItem(cartItem).subscribe();
  }

  removeItemFromCart(productId: string): void {
    this.cartService.removeItemFromCart(productId).subscribe();
  }

  clearCart(): void {
    this.toggleCart()
    this.cartService.clearCart().subscribe();
  }

  checkout(): void {
    this.toggleCart()
    this.cartService.checkout().subscribe((res) => {
      if (res.success) {
        this.alertService.alert('Succesfully checked out', 'success');
        this.cartService.cart = null;
      }
    });
  }
  onActivate(event:Event) {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
 }
}

