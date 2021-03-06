import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ICreateTask, IHistoryTask, IResAssigned, ITask, ITaskPosition} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiTaskService {
  public _nameTask: string = '';

  constructor(
    private http: HttpClient
  ) {}

  public createTask$(data: ICreateTask): Observable<ITask> {
    return this.http.post<ITask>(`/api/task`, {data});
  }

  public updateTitleTask$(task_id: number, title: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/title`, {title})
      .pipe(tap((data) => this._nameTask = data.title));
  }

  public leaveTask$(task_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${task_id}/leave`);
  }

  public newUpdateColumn$(task_id: number, data: ITaskPosition | undefined, nameTaskList: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/column`, {data, nameTaskList});
  }

  public newUpdateOrder$(data: ITaskPosition | undefined): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/order`, {data});
  }

  public updateDescriptionTask$(task_id: number, description: string): Observable<ITask> {
    return this.http.put<ITask>(`/api/task/${task_id}/description`, {description});
  }

  public deleteTask$(task_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${task_id}`);
  }

  public getHistory$(task_id: number): Observable<IHistoryTask[]> {
    return this.http.get<IHistoryTask[]>(`/api/task/${task_id}/history`);
  }

  public getAllAssignedUsers$(task_id: number, board_id: number): Observable<IResAssigned> {
    return this.http.get<IResAssigned>(`/api/task/${task_id}/assigned/${board_id}`);
  }

  public createAssignedUser$(task_id: number, user_id: number, board_id: number): Observable<IResAssigned> {
    return this.http.post<IResAssigned>(`/api/task/${task_id}/assigned/user/${user_id}`, {board_id});
  }

  public deleteAssignedUser$(user_id: number, task_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${task_id}/assigned/user/${user_id}`);
  }

  public returnColumn$(task_id: number, column: string): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/${task_id}/return/column`, { column });
  }
}
