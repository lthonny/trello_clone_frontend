import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUAssigned} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  constructor(
    private http: HttpClient
  ) {}

  public Fetch$(id: number, userId: any, boardId: number): Observable<any> {
    return this.http.post<any>(`/api/assigned/users/${id}`, {userId, boardId});
  }

  public Create$(id: number, userId: number): Observable<IUAssigned> {
    return this.http.post<IUAssigned>(`/api/assigned/user/create/${id}`, {userId});
  }

  public Remove$(id: number, userId: number, assigned: boolean): Observable<any> {
    return this.http.post<any>(`/api/assigned/user/remove/${id}`, {userId, assigned});
  }

  // remove$(id: number, userId: number, assigned: boolean): Observable<any> {
  //   return this.http.delete<any>(`/api/assigned/users/${id}`, {assigned});
  // }
}
