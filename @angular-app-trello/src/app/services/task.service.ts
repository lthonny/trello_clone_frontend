import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../interfaces";
import {IDescriptionUpdate} from "../private/dashboard-page/dialog-data-example-dialog";

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

  public create$(data: any): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/create/${this._id}`, data);
  }

  public updateOrder$(data: any): Observable<any> {
    return this.http.post<any>(`/api/tasks/updateOrder/${this._id}`, data)
  }

  public update$(data: any, nameList: string): Observable<any> {
    return this.http.post<any>(`/api/task/update`, {data, nameList})
  }

  public updateDescription(post: IDescriptionUpdate): Observable<any> {
    return this.http.post<any>(`/api/task/updateDescription`, post)
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

}
