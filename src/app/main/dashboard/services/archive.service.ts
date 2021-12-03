import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {IArchive} from "../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  public archivedTasks: IArchive[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  public getArchivedTasks$(id: number): Observable<IArchive[]> {
    return this.http.get<IArchive[]>(`/api/archive/${id}`)
      .pipe(tap((response: IArchive[]) => {
        this.archivedTasks.length = 0;
        response?.forEach((task: IArchive) => this.archivedTasks.push(task))
      }));
  }

  public archiveTask$(id: number, archive: boolean, board_id: number): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/archive/${id}`, {archive, board_id});
  }
}
