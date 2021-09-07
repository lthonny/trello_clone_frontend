import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IAuthResponse, ITask} from "../interfaces";

@Injectable()
export class TasksService {
  constructor(
    public http: HttpClient
  ) {}

  fetchOne(id: string) {
    return this.http.get(`http://localhost:3000/api/fetchOne/${id}`);
  }

  fetchAll() {
    return this.http.get(`http://localhost:3000/api/fetchAll`);
  }

  create(task: ITask) {
    return this.http.post(`http://localhost:3000/api/create`, task);
  }

  update(id: string, task: any) {
    return this.http.put(`http://localhost:3000/api/update/${id}`, task);
  }

  remove(id: string) {
    return this.http.delete(`http://localhost:3000/api/delete/${id}`);
  }
}
