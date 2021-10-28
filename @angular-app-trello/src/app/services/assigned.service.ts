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

  remove$(id: number): Observable<any> {
    return this.http.delete<any>(`/api/assigned/users/${id}`);
  }
}
