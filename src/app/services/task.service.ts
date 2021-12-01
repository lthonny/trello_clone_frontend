import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateTask, IDescriptionUpdate, ITask} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public _nameTask: string = '';

  constructor(
    private http: HttpClient
  ) {
  }

  public create$(data: ICreateTask): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/create`, {data});
  }

  public updateTitle$(id: number, title: string): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/update/title`, {id, title})
      .pipe(
        tap((data) => {
          this._nameTask = data.title;
        })
      );
  }

  public updateNameTaskList$(data: ITask, nameTaskList: string): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/update/column`, { task_id: data.id, nameTaskList, order: data.order });
  }

  public updateOrder$(data: any): Observable<string> {
    return this.http.post<string>(`/api/task/update/order`, {data});
  }

  public updateDescription$(post: IDescriptionUpdate): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/update/description`, {post});
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

  public tasksAllDelete$(board_id: number, nameTaskList: string): Observable<string> {
    return this.http.post<string>(`/api/task/allDelete/${board_id}`, { nameTaskList, board_id });
  }
}
