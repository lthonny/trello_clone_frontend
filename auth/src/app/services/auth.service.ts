import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, ISingIn, ISingUp,} from '../interfaces';
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthorized = new BehaviorSubject<boolean>(false);

  get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized.asObservable();
  }

  get isAuthorized(): boolean {
    return this._isAuthorized.getValue();
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private error: ErrorService,
    private tokenService: TokenService
  ) {
    this.isAuth$().subscribe(() => {
      this._isAuthorized.next(true);
    }, () => {
      this._isAuthorized.next(false);
    })
  }

  public isAuth$(): Observable<any> {
    const accessToken = this.tokenService.getToken$();
    return this.http.get(`/api/isauth`, {headers: {Authorization: `Bearer ${accessToken}`}})
  }

  public singUp$(user: ISingUp): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/sign_up`, user);
  }

  public singIn$(user: ISingIn): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`/api/sign_in`, user)
      .pipe(
        catchError(err => this.error.handleError(err)),
        tap((data) => this.login$(data))
      )
  }

  public login$(data: IAuthResponse) {
    const {accessToken} = data;
    localStorage.setItem('token', accessToken);
    this._isAuthorized.next(true);
  }

  public logout$(): Observable<any> {
    localStorage.removeItem('token');
    this._isAuthorized.next(false);
    return this.http.post(`/api/logout`, {});
  }
}
