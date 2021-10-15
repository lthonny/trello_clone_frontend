import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ArchiveTasksService {

  constructor(
    private http: HttpClient
  ) {}

  public fetchAllArchive$(id: any): Observable<any> {
    return this.http.get<any>(`/api/tasks/archive/${id}`);
  }

  public fetchOneArchive(data: any): Observable<any> {
    return this.http.post<any>(`/api/task/archive`, data);
  }
}
