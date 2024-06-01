import { Component,Input } from '@angular/core';
import { ProductPrice } from '../../interfaces';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-product-price',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.css'
})
export class ProductPriceComponent {
  @Input() productPrice:ProductPrice|null = null;
}
