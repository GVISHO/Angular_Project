import { Component,inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService,AlertService } from '../../shared/services';
import { SignInUser } from '../../shared/interfaces/user';
import { RouterLink } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
private readonly fb = inject(FormBuilder)
private readonly authService = inject(AuthService)
private readonly alertService = inject(AlertService)
readonly signIn = this.fb.group({
  email:new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',Validators.required)
})
onSignInSubmit() {
  const { email, password } = this.signIn.value as SignInUser;
  this.authService
    .signIn({ email, password })
    .pipe(
      tap((response) => {
        this.alertService.toast(
          'Successfully authorized',
          'success',
          'green',
        );
        this.authService.handleSignIn(response);
        this.signIn.reset();
      }),
      catchError((err) => {
        this.alertService.error(err.error);
        return EMPTY;
      }),
    )
    .subscribe();
}
getSignInFormError(control: string) {
  return (this.signIn.get(control) || {}).errors || {};
}
}
