import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {IAllArchiveTasks, IArchive} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArchiveTasksService {
  public archivedTasks: IArchive[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  public getArchivedTasks$(id: number): Observable<IAllArchiveTasks> {
    return this.http.get<IAllArchiveTasks>(`/api/task/archive/${id}`)
      .pipe(tap((response: IAllArchiveTasks) => {
        this.archivedTasks.length = 0;
        response.tasks?.forEach((task: IArchive) => this.archivedTasks.push(task))
      }));
  }

  public archiveTask$(data: IArchive): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/task/archive`, data);
  }
}
