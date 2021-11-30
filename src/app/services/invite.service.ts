import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBoard, IInitOwner, IInvitedUser, IInviteKey, IResInviteBoard} from "../interfaces";

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
    return this.http.post<IInviteKey>(`/api/invite/create`, { id });
  }

  public inviteBoard$(key: string): Observable<IBoard> {
    return this.http.post<IBoard>(`/api/invite`, { key });
  }

  public invitedUsers$(board_id: number): Observable<IInvitedUser[]> {
    return this.http.get<IInvitedUser[]>(`/api/invite/users/${board_id}`);
  }

  public getOwner$(board_id: number): Observable<IInitOwner> {
    return this.http.get<IInitOwner>(`/api/invite/owner/${board_id}`);
  }

  public leaveBoard$(board_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/invite/leave/${board_id}`);
  }

  public removeInvitedUsers$(board_id: number, user_id: number): Observable<string> {
    return this.http.post<string>(`/api/invite/delete/${board_id}`, {user_id});
  }
}
