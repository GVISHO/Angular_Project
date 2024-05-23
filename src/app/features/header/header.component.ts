import { AsyncPipe } from '@angular/common';
import { Component, inject,OnInit } from '@angular/core';
import { BrandsService } from '../../shared/services';
import { BrandsDropdownComponent } from '../../shared/ui/brands-dropdown/brands-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe,BrandsDropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly brandService=inject(BrandsService)
  readonly brands$=this.brandService.getBrands()

}
