import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDescriptionUpdate, ITask} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _id: string | null = localStorage.getItem('id');
  public _nameTask: string = '';

  constructor(
    private http: HttpClient
  ) {}

  public getTasks$(id: string): Observable<ITask[]> {
    return this.http.get<ITask[]>(`/api/board/getAllTasks/${id}`);
  }

  public create$(data: any): Observable<ITask> {
    return this.http.post<ITask>(`/api/task/create/${this._id}`, data);
  }

  public updateTitle$(id: number, title: string): Observable<any> {
   return this.http.post<any>(`/api/task/updateTitle`, {id, title})
     .pipe(
       tap((data) => {
         // this.authUser(data);
         this._nameTask = data.title;
         // console.log(data.title);
       })
     );
  }

  public updateOrder$(data: any): Observable<any> {
    return this.http.post<any>(`/api/task/updateOrder/${this._id}`, data);
  }

  public update$(data: any, nameList: string, userId: string | null): Observable<any> {
    return this.http.post<any>(`/api/task/update`, {data, nameList, userId});
  }

  public updateTask$(id: number, nameList: string): Observable<any> {
    return this.http.post<any>(`/api/task/update/taskList`, {nameList});
  }

  public updateDescription(post: IDescriptionUpdate): Observable<any> {
    return this.http.post<any>(`/api/task/updateDescription`, post);
  }

  public delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/task/${id}`);
  }

  public tasksAllDelete$(id: number, nameTaskList: string): Observable<any> {
    return this.http.post(`/api/task/allRemove/${id}`, {nameTaskList});
  }
}
