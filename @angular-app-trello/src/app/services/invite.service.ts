import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IInvitedUsersName, IInviteKey} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  public _key: string = '';

  constructor(
    private http: HttpClient
  ) {}

  public InviteKey$(id: number): Observable<IInviteKey> {
    return this.http.get<IInviteKey>(`/api/board/invite/${id}`);
  }

  public InviteUsers$(key: any): Observable<any> {
    return this.http.post<any>(`/api/board/key/${key}`, null);
  }

  public InviteBoard$(id: string | null, key: string): Observable<any>{
    return this.http.post<any>(`/api/invite`, {id, key});
  }

  public InvitedUsers(boardId: number, userName: string): Observable<IInvitedUsersName[]> {
    return this.http.post<IInvitedUsersName[]>(`/api/invited/users/${boardId}`, {name: userName});
  }
}
