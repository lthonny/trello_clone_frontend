import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, ISingIn, ISingUp, IUser} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth() {
    return !!localStorage.getItem('token');
  }

  constructor(
    public http: HttpClient
  ) {}

  SingUp(user: ISingUp) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/api/sign_up`, user);
  }

  SingIn(user: ISingIn) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/api/sign_in`, user);
  }

  Logout() {
    return this.http.post(`http://localhost:3000/api/logout`, {});
  }



  RemoveToken() {
    localStorage.removeItem('token');
    // this.setAuth(false);
  }

  SetToken(token: any) {
    return localStorage.setItem('token', token);
    // this.setAuth(true);
  }

  checkAuth() {
    // this.http
  }
}
