import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IInitOwner, IInvitedUsersName, IInviteKey, IOwner} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  public _key: string = '';
  public _link: string = '';

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

  public InvitedUsers(boardId: number, userId: string | null, name: string): Observable<IInvitedUsersName> {
    return this.http.post<IInvitedUsersName>(`/api/invited/users/${boardId}`, {userId, name});
  }

  public Owner$(data: IOwner): Observable<IInitOwner> {
    return this.http.post<IInitOwner>(`/api/invite/owner`, {data});
  }
}
