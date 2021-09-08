import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    public http: HttpClient
  ) {}

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    return localStorage.setItem('token', token);
  }

  // refreshToken() {
  //   return this.http.get(`http://localhost:3000/api/refresh`)
  //     .subscribe((user: any) => {
  //       this.setToken(user.accessToken);
  //     })
  // }
}
