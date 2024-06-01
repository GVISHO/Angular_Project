import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product,Products } from '../interfaces';
import { EVERREST_API_URL,API_BASE_URL } from '../consts';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  readonly baseURL = API_BASE_URL;

  getProducts() {
    return this.http.get<Products>(
      `${this.baseURL}/shop/products/all?page_size=50`,
    );
  }
  getProductsForCarousel(){
    return this.http.get<Products>(
      `${this.baseURL}/shop/products/all?page_size=10`,
    );
  }
  getSingleProductById(id: string) {
    return this.http.get<Product>(`${this.baseURL}/shop/products/id/${id}`);
  }
  getProductsByBrand(brand:string){
    return this.http.get<Products>(`${this.baseURL}/shop/products/brand/${brand}?page_index=1&page_size=20`)
  }
  getProductsByCategory(category:string){
    let id:string|undefined;
    if(category === 'laptops'){
      id='1';
    }else if (category === 'phones'){
      id = '2';
    }
    return this.http.get<Products>(`${this.baseURL}/shop/products/category/${id}?page_index=1&page_size=30`)
  }
}
