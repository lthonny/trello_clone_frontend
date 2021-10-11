import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICreateTask, ITask} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}

  public getById(id: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/board/${id}`);
  }

  public getTasks$(): Observable<ITask[]> {
    const id = localStorage.getItem('id');
    return this.http.get<ITask[]>(`/api/tasks/${id}`);
  }

  public create$(date: any): Observable<ITask> {
    const id = localStorage.getItem('id');
    return this.http.post<ITask>(`/api/task/create/${id}`, date);
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

}
