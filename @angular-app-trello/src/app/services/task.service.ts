import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _id: string | null = localStorage.getItem('id');

  constructor(
    private http: HttpClient
  ) {
  }

  public getById(id: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/board/${id}`);
  }

  public getTasks$(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/tasks/${this._id}`);
  }

  public create$(date: any): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/create/${this._id}`, date);
  }

  public updateOrder$(date: any): Observable<any> {
    return this.http.post<any>(`/api/tasks/updateOrder${this._id}`, date)
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

}
