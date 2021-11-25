import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IInitOwner, IInvitedUser, IInvitedUsersName, IInviteKey, IOwner, IResInviteBoard} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  public _key: string = '';

  constructor(
    private http: HttpClient
  ) {
  }

  public getInviteKey$(id: number): Observable<IInviteKey> {
    return this.http.get<IInviteKey>(`/api/invite/create/${id}`);
  }

  public inviteBoard$(userId: string | null, key: string): Observable<IResInviteBoard> {
    return this.http.post<IResInviteBoard>(`/api/invite`, {userId, key});
  }

  public invitedUsers$(boardId: number, userId: string | null, name: string): Observable<IInvitedUsersName> {
    return this.http.post<IInvitedUsersName>(`/api/invite/users/${boardId}`, {userId, name});
  }

  public getOwner$(data: IOwner): Observable<IInitOwner> {
    return this.http.post<IInitOwner>(`/api/invite/owner`, {data});
  }

  public leaveBoard$(data: { user_id: string | null, board_id: number }): Observable<string> {
    return this.http.post<string>(`/api/invite/leave`, {data});
  }

  public removeInvitedUsers$(data: { board_id: number, user: IInvitedUser }): Observable<string> {
    return this.http.post<string>(`/api/invite/remove`, {data});
  }
}
