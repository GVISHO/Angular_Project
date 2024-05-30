import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from './alert.service';
import { SignUpUser, User, UserChangePassword } from '../interfaces';
import { API_BASE_URL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly router = inject(Router);
  readonly baseUrl = `${API_BASE_URL}/auth`;
  private readonly http = inject(HttpClient);
  // private readonly jwtService = inject(JwtHelperService);
  // private readonly alertSerivce = inject(AlertService);

  updateUser(user:SignUpUser){
    return this.http.patch<User>(`${this.baseUrl}/update`,{...user})
  }
  changePassword(details:UserChangePassword){
    return this.http.patch<User>(`${this.baseUrl}/change_password`,{...details})
  }
  deleteAccount(){
    return this.http.delete(`${this.baseUrl}/delete`)
  }
}
