import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) {}

  public getTasks$(): Observable<ITask[]> {
    const id = localStorage.getItem('id');
    return this.http.get<ITask[]>(`/api/tasks/${id}`);
  }

}
