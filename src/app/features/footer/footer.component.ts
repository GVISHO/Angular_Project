import { Component,inject } from '@angular/core';
import { BrandsService } from '../../shared/services';
import { AsyncPipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe,UpperCasePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private readonly brandService=inject(BrandsService)
  readonly brands$=this.brandService.getBrands()
}
