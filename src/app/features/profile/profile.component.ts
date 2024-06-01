import { Component, inject } from '@angular/core';
import { AlertService, AuthService } from '../../shared/services';
import { SignUpUser, User, UserChangePassword } from '../../shared/interfaces';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { ProfileService } from '../../shared/services/profile.service';
import { EMPTY, catchError, tap } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  private readonly authService = inject(AuthService)
  private readonly profileService = inject(ProfileService)
  private readonly fb = inject(FormBuilder)
  private readonly alertService = inject(AlertService)
  private readonly router = inject(Router)
  isEditMode= false
  // readonly user =  this.authService.user$.subscribe((user: User | null) => { console.log(user)})
  profileImage:string|undefined = ''
  readonly profileForm= this.fb.group({
    firstName: new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(22),
    ],),
    lastName: new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(22),
    ]),
    age: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(18)]),
    email: new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.email,
    ]),
    
    address: new FormControl({value: '', disabled: true}, Validators.required),
    phone: new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.pattern(/\+9955\d{8}$/),
    ]),
    zipcode: new FormControl({value: '', disabled: true}, Validators.required),
    gender: new FormControl({value: '', disabled: true}, Validators.required),
    avatar: new FormControl({value: '', disabled: true},Validators.required)
  })
  readonly passwordForm = this.fb.group({
    oldPassword:new FormControl('',Validators.required),
    newPassword:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(22)],)
  })
  readonly user = this.authService.user$.subscribe((user:User|null) => {
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        address: user.address,
        phone: user.phone,
        zipcode: user.zipcode,
        gender: user.gender,
        avatar: user.avatar
      });
      this.profileImage = user.avatar
      console.log(this.profileImage)
    }
  })
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      this.onSubmit();
    }
  }
  onSubmit(): void {
    // console.log('Form Valid:', this.profileForm.valid); // Debugging statement
    // console.log('Form Value:', this.profileForm.value); // Debugging statement
    // // this.logValidationErrors()
    // // if (this.profileForm.valid) {
    // //   const updatedUser = this.profileForm.value as SignUpUser;
    // //   console.log('Updated User: ', updatedUser);
    // // }
    // const updatedUser = this.profileForm.value as SignUpUser;
    // console.log(updatedUser)
    const user = this.profileForm.value as SignUpUser;
    this.profileService.updateUser(user).pipe(tap(() =>{
      this.alertService.toast('Succesfully Updated Account','success','green');
    }),catchError((err) => {
      console.log(err);
      return EMPTY
    }),).subscribe()
    this.authService.handleRefresh()
  }
  logValidationErrors() {
    for (const controlName in this.profileForm.controls) {
      const control = this.profileForm.get(controlName);
      if (control && control.invalid) {
        console.log(`Validation error in control ${controlName}:`, control.errors);
      }
    }
  }
  onSubmitChange():void{
    const changes = this.passwordForm.value as UserChangePassword;
    this.profileService.changePassword(changes).pipe(tap(() => {
      this.alertService.toast('Successfully changed passwords','success','green');
    }),catchError((err) => {
      console.log(err)
      return EMPTY
    })).subscribe()
    this.authService.logOut()
  }
  delete(): void{
    return this.alertService.deleteAccount()
  }
}
