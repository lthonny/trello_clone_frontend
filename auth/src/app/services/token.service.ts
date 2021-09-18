import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuthResponse} from "../interfaces";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    public http: HttpClient,
    private cookieService: CookieService
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  getRefreshToken(): string {
    return this.cookieService.get('refreshToken');
  }

  refreshToken$(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(`/api/refresh`);
  }
}
