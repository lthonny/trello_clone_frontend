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
    return this.http.get<IInviteKey>(`/api/invite/create/${id}`);
  }

  public InviteUsers$(key: any): Observable<any> {
    return this.http.post<any>(`/api/invite/key/${key}`, null);
  }

  public InviteBoard$(userId: string | null, key: string): Observable<any>{
    return this.http.post<any>(`/api/invite`, {userId, key});
  }

  public InvitedUsers(boardId: number, userId: string | null, name: string): Observable<IInvitedUsersName> {
    return this.http.post<IInvitedUsersName>(`/api/invite/users/${boardId}`, {userId, name});
  }

  public Owner$(data: IOwner): Observable<IInitOwner> {
    return this.http.post<IInitOwner>(`/api/invite/owner`, {data});
  }

  public LeaveBoard$(data: any): Observable<any> {
    return this.http.post<any>(`/api/invite/leave`, {data});
  }

  public RemoveInvitedUsers$(data: any): Observable<any> {
    return this.http.post<any>(`/api/invite/remove`, { data });
  }
}
