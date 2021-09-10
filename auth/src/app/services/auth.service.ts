import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, ISingIn, ISingUp, } from '../interfaces';
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";
import {Observable} from "rxjs";

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

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  auth(): boolean {
    return !!localStorage.getItem('token');
  }

  singUp$(user: ISingUp): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/sign_up`, user);
  }

  singIn$(user: ISingIn): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/sign_in`, user)
      .pipe(
        catchError(err => this.error.handleError(err))
      )
  }

  logout() {
    return this.http.post(`/api/logout`, {});
  }
}
