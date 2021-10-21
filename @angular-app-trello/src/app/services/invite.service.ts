import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IInviteKey} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(
    private http: HttpClient
  ) {}

  public InviteKey$(id: number): Observable<IInviteKey> {
    return this.http.get<IInviteKey>(`/api/board/invite/${id}`);
  }
}
