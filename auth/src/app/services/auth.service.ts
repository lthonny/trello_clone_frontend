import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAuthResponse, ISingIn, ISingUp, } from '../interfaces';
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;

  constructor(
    public http: HttpClient,
    public router: Router,
    public error: ErrorService
  ) {
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  auth() {
    return !!localStorage.getItem('token');
  }

  singUp(user: ISingUp) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/api/sign_up`, user);
  }

  singIn(user: ISingIn) {
    return this.http.post<IAuthResponse>(`http://localhost:3000/api/sign_in`, user)
      .pipe(
        catchError(err => this.error.handleError(err))
      )
  }

  logout() {
    return this.http.post(`http://localhost:3000/api/logout`, {})
  }


}
