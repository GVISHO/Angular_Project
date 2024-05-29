import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css'
})
export default class RecoveryComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  readonly recovery = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  getRecoveryFormError(control: string) {
    return (this.recovery.get(control) || {}).errors || {};
  }
  onSubmit() {
    if (!this.recovery.value.email) {
      return;
    }

    this.authService.recovery(this.recovery.value.email);
  }
}
