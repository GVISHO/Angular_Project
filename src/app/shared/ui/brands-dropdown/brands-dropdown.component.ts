import { Component,Input,OnInit } from '@angular/core';
import { brand } from '../../interfaces';

@Component({
  selector: 'app-brands-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './brands-dropdown.component.html',
  styleUrl: './brands-dropdown.component.css'
})
export class BrandsDropdownComponent {
  @Input() brand: string | null = null;

}
