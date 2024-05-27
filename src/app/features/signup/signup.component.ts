import { Component,inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { SignUpUser } from '../../shared/interfaces/user';
import { AuthService,AlertService } from '../../shared/services';
import { EMPTY,catchError,tap } from 'rxjs';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export default class SignupComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  readonly signUp= this.fb.group({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(22),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(22),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(22),
    ]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('+995', [
      Validators.required,
      Validators.pattern(/\+9955\d{8}$/),
    ]),
    zipcode: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
  })
  getSignUpFormError(control: string) {
    return (this.signUp.get(control) || {}).errors || {};
  }

  onSignUpSubmit() {
    const user = this.signUp.value as SignUpUser;
    user.avatar = `https://api.dicebear.com/8.x/pixel-art-neutral/svg?seed=${user.firstName}`;

    this.authService
      .signUp(user)
      .pipe(
        tap(() => {
          this.alertService.toast(
            'Successfully registered',
            'success',
            'green',
          );
          
        }),
        catchError((err) => {
          this.alertService.error(err.error);
          return EMPTY;
        }),
      )
      .subscribe();
      this.router.navigateByUrl('/login')
  }
}
