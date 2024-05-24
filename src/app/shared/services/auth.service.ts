import { Injectable,Inject, inject } from '@angular/core';
import { JwtTokens,User,SignInUser,SignUpUser } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EVERREST_API_URL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)
  // private readonly jwtService = inject(JwtHelperService)
  readonly #user$ = new BehaviorSubject<User | null>(null)
  readonly user$ = this.#user$.asObservable()
  readonly baseUrl = `${EVERREST_API_URL}/auth`
  get user(){
    return this.#user$.value
  }
  set user(user:User|null){
    this.#user$.value;
  }
  signUp(user: SignUpUser) {
    return this.http.post<User>(`${this.baseUrl}/sign_up`, { ...user });
  }

  signIn(user: SignInUser) {
    return this.http.post<JwtTokens>(`${this.baseUrl}/sign_in`, { ...user });
  }

  logOut() {
    this.user = null;
  }
}

