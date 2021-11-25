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
  ) {}

  public getTasks$(id: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/board/getAllTasks/${id}`);
  }

  public create$(id: string | null, data: ICreateTask): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/create/${id}`, data);
  }

  public updateTitle$(id: number, title: string): Observable<ITask> {
   return this.http.post<ITask>(`/api/task/updateTitle`, {id, title})
     .pipe(
       tap((data) => {
         this._nameTask = data.title;
       })
     );
  }

  public updateOrder$(id: string | null, data: any): Observable<string> {
    return this.http.post<string>(`/api/task/updateOrder/${id}`, data);
  }

  public update$(data: ITask, nameList: string, userId: string | null): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/update`, {data, nameList, userId});
  }

  public updateDescription$(userId: string | null, post: IDescriptionUpdate): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/updateDescription`, {userId, post});
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/delete/${id}`);
  }

  public tasksAllDelete$(id: number, nameTaskList: string): Observable<string> {
    return this.http.post<string>(`/api/task/allRemove/${id}`, {nameTaskList});
  }
}
