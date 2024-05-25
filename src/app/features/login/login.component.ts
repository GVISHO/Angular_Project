import { Component,inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignInUser } from '../../shared/interfaces/user';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
private readonly fb = inject(FormBuilder)
readonly signIn = this.fb.group({
  email:new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',Validators.required)
})
onSignInSubmit() {
  console.log(this.signIn.value);
}
getSignInFormError(control: string) {
  return (this.signIn.get(control) || {}).errors || {};
}
}
