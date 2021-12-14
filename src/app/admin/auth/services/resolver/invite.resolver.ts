import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class InviteResolver implements Resolve<boolean> {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
    // if(!this.auth.isAuthorized){
    //   return this.router.createUrlTree(['/admin', 'login-page']);
    // }
    // return true;
  }
}
