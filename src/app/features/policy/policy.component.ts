import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpCentreArticleComponent } from '../../shared/ui';
@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [RouterLink,HelpCentreArticleComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export default class PolicyComponent {

}
