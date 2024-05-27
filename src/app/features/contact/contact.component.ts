import { Component } from '@angular/core';
import { HelpCentreArticleComponent } from '../../shared/ui';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ HelpCentreArticleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export default class ContactComponent {

}
