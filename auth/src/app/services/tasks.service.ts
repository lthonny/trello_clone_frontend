import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ITask} from "../interfaces";

@Injectable()
export class TasksService {
  constructor(
    public http: HttpClient
  ) {}

  public fetchOne$(id: string) {
    return this.http.get(`/api/fetchOne/${id}`);
  }

  public fetchAll$() {
    return this.http.get(`/api/fetchAll`);
  }

  public create$(task: ITask) {
    return this.http.post(`/api/create`, task);
  }

  public update$(id: string, task: ITask) {
    return this.http.put(`/api/update/${id}`, task);
  }

  public remove$(id: string) {
    return this.http.delete(`/api/delete/${id}`);
  }
}
