import { AsyncPipe } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { BrandsService } from '../../shared/services';

import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe,UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly brandService=inject(BrandsService)
  readonly brands$=this.brandService.getBrands()

}
