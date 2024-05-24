import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EVERREST_API_URL } from '../consts';
import { Products, brand, brands } from '../interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly http = inject(HttpClient);
  readonly baseurl = EVERREST_API_URL;

  getBrands() {
    return this.http
      .get<string[]>(`${this.baseurl}/shop/products/brands`)
      .pipe(tap((response) => console.log(response)));
  }
  getSingleBrandProductsByName(name: string) {
    return this.http.get<Products>(
      `${this.baseurl}/shop/products/brand/${name}?page_size=25`,
    );
  }
}

