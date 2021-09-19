import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, ISingIn, ISingUp, } from '../interfaces';
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isAuth: boolean = false;
  private _isAuthorized = new BehaviorSubject<boolean>(false);

  get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized.asObservable();
  }

  get isAuthorized(): boolean {
    return this._isAuthorized.getValue();
  }

  constructor(
    public http: HttpClient,
    public router: Router,
    public error: ErrorService,
    public tokenService: TokenService
  ) {

    this.tokenService.refreshToken$().subscribe(()=> {
      this._isAuthorized.next(true);
    })
    // this.isAuth$().subscribe(() => {
    //   this._isAuthorized.next(true);
    // });
  }

  ngOnInit() {
  //   this.isAuth$().subscribe(() => {
  //     this._isAuthorized.next(true);
  //   });
  }

  isAuth$(): Observable<any> {
    return this.http.get(`/api/isauth`);
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
        catchError(err => this.error.handleError(err)),
        tap((data) => this.login(data))
      )
  }

  login(data: IAuthResponse) {
    const {accessToken} = data;
    localStorage.setItem('token', accessToken);
    this._isAuthorized.next(true);
  }

  logout() {
    this._isAuthorized.next(false);
    return this.http.post(`/api/logout`, {});
  }
}
