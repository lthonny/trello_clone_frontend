import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  constructor(
    private http: HttpClient
  ) {}

  fetch$(id: number): Observable<any> {
    return this.http.get<any>(`/api/assigned/users/${id}`);
  }

  add$(id: number, userId: number): Observable<any> {
    return this.http.post<any>(`/api/assigned/users/${id}`, {userId});
  }

  update$(id: number, userId: number, assigned: boolean) {
    return this.http.put<any>(`/api/assigned/users/${id}`, {userId, assigned});
  }

  remove$(id: number): Observable<any> {
    return this.http.delete<any>(`/api/assigned/users/${id}`);
  }
}
