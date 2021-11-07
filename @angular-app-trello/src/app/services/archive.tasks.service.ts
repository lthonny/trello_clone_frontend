import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IArchive} from "../interfaces";

@Injectable({
    providedIn: 'root'
})
export class ArchiveTasksService {
  public archivedTasks: any = [];
  public archived: boolean = true;

  constructor(
    private http: HttpClient
  ) {}

  public getArchive$(id: number): Observable<IArchive[]> {
    return this.http.get<IArchive[]>(`/api/tasks/archive/${id}`);
  }

  public setArchive$(data: IArchive): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/task/archive`, data);
  }

  public updateArchive$(data: IArchive): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/task/updateArchive`, data);
  }
}
