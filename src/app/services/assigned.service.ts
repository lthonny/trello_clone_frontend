import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResAssigned, IUAssigned} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AssignedService {
  constructor(
    private http: HttpClient
  ) {
  }

  public allUsers$(task_id: number, board_id: number): Observable<IResAssigned> {
    return this.http.post<IResAssigned>(`/api/assigned/${task_id}`, {task_id, board_id});
  }

  public assignUser$(user_id: number, task_id: number, board_id: number): Observable<IUAssigned> {
    return this.http.post<IUAssigned>(`/api/assigned/create/${task_id}`, {user_id, task_id, board_id});
  }

  public removeAssignedUser$(user_id: number, task_id: number, board_id: number): Observable<string> {
    return this.http.post<string>(`/api/assigned/remove/${task_id}`, {user_id, task_id, board_id});
  }
}
