import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import {TokenService} from "./token.service";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {IAuthResponse} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    public router: Router,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    console.log('authReq', authReq);
    const token = this.tokenService.getToken();
    if (token !== null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(err);
    }))

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token) {
        return this.tokenService.refreshToken$().pipe(
          switchMap((token: IAuthResponse) => {
            this.isRefreshing = false;
            this.tokenService.setToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logout();
            return throwError(err);
          })
        )
      } else {
        this.authService.logout();
        return throwError('Token missing');
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }

  // private handleAuthError(err: HttpErrorResponse): Observable<any> {
  //   if (err.status === 401) { // one status
  //     // this.router.navigate(['/admin', 'login']);
  //     // console.log('Продлите токен');
  //
  //     // this.tokenService.refreshToken().subscribe((user: any) => {
  //     //   this.tokenService.setToken(user.accessToken);
  //     // })
  //     return this.tokenService.refreshToken().pipe(
  //       catchError(e => {
  //         this.auth.logout();
  //         return throwError(e);
  //       }),
  //       tap(() => console.log('before refresh')),
  //       tap((data: any) => this.auth.login(data))
  //     )
  //   }
  //
  //   return throwError(err);
  // }
  //
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.tokenService.getToken();
  //   const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  //   return next.handle(authReq).pipe(
  //     catchError(e => this.handleAuthError(e)));
  // }
}


