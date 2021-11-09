import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAllArchiveTasks, IArchive} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ArchiveTasksService {
  public archivedTasks: any = [];
  public archived: boolean = true;

  constructor(
    private http: HttpClient
  ) {}

  public getArchive$(id: number): Observable<IAllArchiveTasks> {
    return this.http.get<IAllArchiveTasks>(`/api/tasks/archive/${id}`)
      .pipe(tap((response: IAllArchiveTasks) => {
        this.archivedTasks.push(response.tasks);
      }))
  }

  public setArchive$(data: IArchive): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/task/archive`, data);
  }

  public updateArchive$(data: IArchive): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/task/updateArchive`, data);
  }
}
