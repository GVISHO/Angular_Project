import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSubject.asObservable();

  toggleCartVisibility(): void {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
  }

  setCartVisibility(isVisible: boolean): void {
    this.cartVisibleSubject.next(isVisible);
  }
  getCartVisibility(): boolean {
    return this.cartVisibleSubject.value;
  }
}
