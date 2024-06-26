export interface BaseUser {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  address: string;
  zipcode: string;
  avatar: string;
  gender: string;
  phone: string;
}
export type SignUpUser = Omit<BaseUser, 'password'>;
export type SignInUser = Pick<BaseUser, 'email' | 'password'>;

export interface User extends SignUpUser {
    _id: string;
    verified: boolean;
    role: string;
}
export interface JwtTokens {
  access_token: string;
  refresh_token: string;
}
export interface JwtTokenDetails {
  iat: number;
  exp: number;
}
export interface UserChangePassword{
  oldPassword:String;
  newPassword:String;
}