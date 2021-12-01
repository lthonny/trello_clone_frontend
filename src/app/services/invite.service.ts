import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBoard, IInitOwner, IInvitedUser, IInviteKey, IResInviteBoard} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getInviteKey$(id: number): Observable<IInviteKey> {
    return this.http.get<IInviteKey>(`/api/invite/key/${id}`);
  }

  public inviteBoard$(key: string | null): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/invite/board/${key}`);
  }

  public inviteUsers$(board_id: number): Observable<IInvitedUser[]> {
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
