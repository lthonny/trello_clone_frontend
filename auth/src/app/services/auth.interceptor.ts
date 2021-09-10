import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";

import {TokenService} from "./token.service";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    public router: Router
  ) {
  }

  // private handleAuthError(err: HttpErrorResponse): Observable<any> {
  //   if (err.status === 401 || err.status === 403) {
  //     this.router.navigate(['/admin', 'login']);
  //     // console.log('Продлите токен');
  //     return of(err.message);
  //   }
  //   setInterval(() => {this.tokenService.refreshToken()}, 10000)
  //   return throwError(err);
  // }
  //
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.tokenService.getToken();
  //   const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  //   return next.handle(authReq).pipe(
  //     catchError(e => this.handleAuthError(e)));
  // }



  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenService.getToken();

    if (token !== null) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.tokenService.refreshToken();
            this.router.navigate(['/admin', 'login']);
          }
          this.tokenService.refreshToken();
        }
      }));
  }
}


