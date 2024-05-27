import { Component } from '@angular/core';
import { HelpCentreArticleComponent } from '../../shared/ui';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HelpCentreArticleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export default class AboutComponent {

}
