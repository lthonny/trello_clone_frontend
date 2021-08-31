import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IAuthResponse, ISingIn, ISingUp } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  get token(): string | null {
    return localStorage.getItem('refreshToken');
  }

  ISingIn(user: ISingIn) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/sign_in`, user);
  }

  ISingUp(user: ISingUp) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/sign_up`, user);
  }

  logout() {
    this.setToken(null);
    //   return this.http.post<IAuthResponse>(`http://localhost:3000/logout`);
  }


  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(response: any) {
    if (response) {
      // const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      // localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
