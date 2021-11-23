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
  ) {}

  public allUsers$(data: {taskId: number, boardId: number}): Observable<IResAssigned> {
    return this.http.post<IResAssigned>(`/api/assigned/${data.taskId}`, { data })
  }

  public assignUser$(data: {userId: number, taskId: number, boardId: number}): Observable<IUAssigned> {
    return this.http.post<IUAssigned>(`/api/assigned/create/${data.taskId}`, { data });
  }

  public removeAssignedUser$(data: {userId: number, taskId: number, boardId: number}): Observable<any> {
    return this.http.post<any>(`/api/assigned/remove/${data.taskId}`, { data });
  }
}
