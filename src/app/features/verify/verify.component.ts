import { Component,inject } from '@angular/core';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export default class VerifyComponent {
  private readonly authService =inject(AuthService)
  logOut() {
    this.authService.logOut();
  }
}
