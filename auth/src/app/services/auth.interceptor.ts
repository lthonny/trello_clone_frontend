import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {TokenService} from "./token.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor( private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenService.getToken();

    if(token !== null) {
      authReq = req.clone({
        // withCredentials: true,
        setHeaders: {
          'Authorization': `Bearer ${this.tokenService.getToken()}`
        },
      });
    }
    return next.handle(authReq);

    // console.log('authReq', authReq);
    // return next.handle(authReq).pipe(
    //   catchError(err => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 401)
    //     }
    //   })
    // )
  }
}


