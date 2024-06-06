import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../consts';
import { Cart,CartItem } from '../interfaces/cart';
import { BehaviorSubject, EMPTY, catchError, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);

  readonly baseUrl = `${API_BASE_URL}/shop/cart`;

  readonly #cart$ = new BehaviorSubject<Cart | null>(null);
  readonly cart$ = this.#cart$.asObservable();

  get cart() {
    return this.#cart$.value;
  }

  set cart(cart: Cart | null) {
    this.#cart$.next(cart);
    if (cart && cart.products.length === 0) {
      this.deleteCartOnServer();
    }
  }

  init() {
    this.getCart()
      .pipe(
        tap((resposne) => {
          this.cart = resposne;
        }),
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe();
  }
  getCart() {
    return this.http.get<Cart>(this.baseUrl).pipe(
      tap(cart => this.#cart$.next(cart))
    );
  }
  addOrUpdateCartItem(cartItem: CartItem) {
    if (this.cart) {
      const existingProduct = this.cart.products.find(p => p.productId === cartItem.id);
      if (existingProduct) {

        return this.updateCartItem(cartItem);
      } else {
        return this.addCartItem(cartItem);
      }
    } else {

      return this.createCart(cartItem);
    }
  }
  createCart(cartItem: CartItem) {
    return this.http.post<Cart>(`${this.baseUrl}/product`, cartItem).pipe(
      tap(() => this.getCart().subscribe())
    );
  }
  addCartItem(cartItem: CartItem) {
    return this.http.patch<Cart>(`${this.baseUrl}/product`, cartItem).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  updateCartItem(cartItem: CartItem) {
    return this.http.patch<Cart>(`${this.baseUrl}/product`, cartItem).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  removeItemFromCart(id: string) {
    return this.http.delete<Cart>(`${this.baseUrl}/product`, {
      body: { id },
    }).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  clearCart() {
    this.cart =null
    return this.http.delete<{ success: boolean }>(this.baseUrl).pipe(
      tap(() => this.getCart().subscribe())
    );
  }

  checkout() {
    this.cart =null
    return this.http.post<{ success: boolean }>(`${this.baseUrl}/checkout`, {}).pipe(
      tap(() => this.getCart().subscribe())
    );
  }
  private deleteCartOnServer() {
    this.http.delete<{ success: boolean }>(this.baseUrl).subscribe({
      next: () => {
        this.#cart$.next(null);
      },
      error: (err) => {
        console.error('Failed to delete cart on server', err);
      }
    });
  }

}
