import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-rating-stars.component.html',
  styleUrl: './product-rating-stars.component.css'
})
export class ProductRatingStarsComponent implements OnChanges  {
  @Input() rating: number=0;
  stars: string[] = [];

  ngOnChanges(): void {
    this.stars = this.getStars(this.rating);
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = (rating % 1) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return [
      ...Array(fullStars).fill('full'),
      ...(halfStar ? ['half'] : []),
      ...Array(emptyStars).fill('empty')
    ];
  }
}
