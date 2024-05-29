import { Component } from '@angular/core';
import { FaqIconsComponent } from '../../shared/ui/faq-icons/faq-icons.component';
import { HelpCentreArticleComponent } from '../../shared/ui';

@Component({
  selector: 'app-helpcentre',
  standalone: true,
  imports: [FaqIconsComponent,HelpCentreArticleComponent],
  templateUrl: './helpcentre.component.html',
  styleUrl: './helpcentre.component.css'
})
export default class HelpcentreComponent {

}
