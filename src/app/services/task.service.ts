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
    return this.http.post<ITask>(`/api/task/updateTitle`, {id, title})
      .pipe(
        tap((data) => {
          this._nameTask = data.title;
        })
      );
  }

  public update$(data: ITask, nameList: string): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/update`, {data, nameList});
  }

  public updateOrder$(data: any): Observable<string> {
    return this.http.post<string>(`/api/task/order`, {data});
  }

  public updateDescription$(post: IDescriptionUpdate): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/description`, {post});
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

  public tasksAllDelete$(id: number, nameTaskList: string): Observable<string> {
    return this.http.post<string>(`/api/task/allDelete/${id}`, {nameTaskList});
  }
}
