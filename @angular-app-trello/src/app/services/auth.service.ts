import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {ErrorService} from "./error.service";
import {TokenService} from "./token.service";

import {IAuthResponse, ISingIn, ISingUp} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _userId: any = localStorage.getItem('id');
  private readonly _userName: any = localStorage.getItem('name');

  private _isAuthorized = new BehaviorSubject<boolean>(false);

  get isUserId() {
    return this._userId;
  }

  get isNameUser() {
    return this._userName;
  }

  get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized.asObservable();
  }

  get isAuthorized(): boolean {
    return this._isAuthorized.getValue();
  }

  constructor(
    public http: HttpClient,
    private router: Router,
    private error: ErrorService,
    private tokenService: TokenService
  ) {
    // this.isAuth$()
    //   .subscribe(() => {
    //     this._isAuthorized.next(true);
    //   }, () => {
    //     this._isAuthorized.next(false);
    //   })
  }

  public isAuth$(): Observable<undefined> {
    const accessToken = this.tokenService.getToken();
    return this.http.get<undefined>(`/api/user/isauth`, {headers: {Authorization: `Bearer ${accessToken}`}})
  }

  public singUp$(user: ISingUp): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/user/signup`, user);
  }

  public authGoogle$(): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/auth/login/success`);
  }

  public singIn$(user: ISingIn): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/user/login`, user)
      .pipe(
        catchError(err => this.error.handleError(err)),
        tap((data) => {
          this.login$(data)
        })
      )
  }

  public login$(data: IAuthResponse) {
    this.setStorage(data.user.id, data.user.name, data.accessToken);
    this._isAuthorized.next(true);
  }

  public logout$(): Observable<string> {
    this._isAuthorized.next(false);
    this.removeStorage('id', this._userName, 'token');
    return this.http.post<string>(`/api/user/logout`, {});
  }

  private setStorage(id: string, name: string, token: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
  }

  private removeStorage(id: string, name: string, token: string) {
    localStorage.removeItem(id);
    localStorage.removeItem(name);
    localStorage.removeItem(token);
  }
}
