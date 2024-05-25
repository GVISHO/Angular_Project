import { Injectable,Inject, inject } from '@angular/core';
import { JwtTokens,User,SignInUser,SignUpUser } from '../interfaces/user';
import { ErrorResponse } from '../interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject,tap,catchError,EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EVERREST_API_URL } from '../consts';
import { StorageKeys } from '../enums';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  // private readonly jwtService = inject(JwtHelperService)
  // private readonly jwtService = inject(JwtHelperService);
  readonly #user$ = new BehaviorSubject<User | null>(null);
  readonly user$ = this.#user$.asObservable();
  readonly baseUrl = `${EVERREST_API_URL}/auth`;
  // constructor() {
  //   this.init();

  //   setInterval(() => {
  //     this.checkUser();
  //   }, 300000);
  // }

  get user(){
    return this.#user$.value
  }
  set user(user:User|null){
    this.#user$.value;
  }
  get accessToken() {
    return localStorage.getItem(StorageKeys.AccessToken);
  }
  set accessToken(token: string | null) {
    if (!token) {
      return;
    }

    localStorage.setItem(StorageKeys.AccessToken, token);
  }
  get refreshToken() {
    return localStorage.getItem(StorageKeys.RefreshToken);
  }
  set refreshToken(token: string | null) {
    if (!token) {
      return;
    }

    localStorage.setItem(StorageKeys.RefreshToken, token);
  }
  signUp(user: SignUpUser) {
    return this.http.post<User>(`${this.baseUrl}/sign_up`, { ...user });
  }

  signIn(user: SignInUser) {
    return this.http.post<JwtTokens>(`${this.baseUrl}/sign_in`, { ...user });
  }
  // init() {
  //   if (this.accessToken && this.refreshToken) {
  //     this.user = this.jwtService.decodeToken(this.accessToken);
  //     this.checkUser();
  //   } else if (!this.accessToken && this.refreshToken) {
  //     this.handleRefresh();
  //   } else {
  //     this.removeTokens();
  //     return;
  //   }
  // }
  handleRefresh() {
    if (!this.refreshToken) {
      this.logOut(false);
      return;
    }

    this.http
      .post<Omit<JwtTokens, 'refresh_token'>>(`${this.baseUrl}/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((token) => {
          this.accessToken = token.access_token;
        }),
        catchError(() => {
          this.logOut(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }
  checkUser() {
    if (!this.accessToken || !this.refreshToken) {
      return;
    }

    this.http
      .get<User>(this.baseUrl)
      .pipe(
        tap((user) => {
          this.user = user;
        }),
        catchError((err) => {
          const error = err.error as ErrorResponse;
          if (error.errorKeys.includes('errors.token_expired')) {
            this.handleRefresh();
            return EMPTY;
          }
          this.logOut(false);
          return EMPTY;
        }),
      )
      .subscribe();
  }
  // handleSignIn(tokens: JwtTokens) {
  //   this.user = this.jwtService.decodeToken(tokens.access_token)
  //   this.accessToken = tokens.access_token;
  //   this.refreshToken = tokens.refresh_token;

  //   if (!this.user?.verified) {
  //     this.router.navigateByUrl('/verify');
  //     return;
  //   }

  //   this.router.navigateByUrl('/');
  // }
  logOut(showMessage = true) {
    this.user = null;
    this.removeTokens();
    if (showMessage) {
      this.alertService.toast('Successfully log out', 'success', 'green');
    }
    this.router.navigateByUrl('/');
  }
  removeTokens() {
    localStorage.removeItem(StorageKeys.AccessToken);
    localStorage.removeItem(StorageKeys.RefreshToken);
  }
  // recovery(email: string) {
  //   this.http
  //     .post<RecoveryResponse>(`${this.baseUrl}/recovery`, { email })
  //     .pipe(
  //       tap((response) => {
  //         this.alertSerivce.alert('Recovery', 'info', response.message);
  //         this.router.navigateByUrl('/auth');
  //       }),
  //       catchError((err) => {
  //         this.alertSerivce.error(err);
  //         return EMPTY;
  //       }),
  //     )
  //     .subscribe();
  // }
}

