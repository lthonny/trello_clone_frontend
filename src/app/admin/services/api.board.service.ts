import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IArchive, IBoard, IResBoard} from "../../interfaces";
import {BoardService} from "./board.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiBoardService {
  constructor(
    private http: HttpClient,
    private boardService: BoardService
  ) {}

  public getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/board`);
  }

  public getTasksBoard$(board_id: number): Observable<IResBoard> {
    return this.http.get<IResBoard>(`/api/board/${board_id}/tasks`);
  }

  public createBoard$(title: string): Observable<IBoard> {
    return this.http.post<IBoard>(`/api/board`, {name: title});
  }

  public updateBoard$(board_id: number, title: string): Observable<string> {
    return this.http.put<string>(`/api/board/${board_id}`, {title});
  }

  public deleteBoard$(board_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/board/${board_id}`);
  }

  public deleteTasksColumn$(board_id: number, nameTaskList: string): Observable<string> {
    return this.http.delete<string>(`/api/board/${board_id}/column/${nameTaskList}`);
  }

  public deleteUserAccess$(board_id: number, user_id: number): Observable<string> {
    return this.http.delete<string>(`/api/board/${board_id}/access/${user_id}`);
  }

  public getInviteKey$(board_id: number): Observable<string> {
    return this.http.get<string>(`/api/board/${board_id}/invite/key`);
  }

  public getInviteBoard$(key: string | null, board_id: string | null | number): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/board/${board_id}/invite/key/${key}`);
  }

  public leaveBoard$(board_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/board/${board_id}/invite/leave`);
  }

  public getArchivedTasks$(board_id: number): Observable<IArchive[]> {
    return this.http.get<IArchive[]>(`/api/board/${board_id}/archives`)
      .pipe(tap((response: IArchive[]) => {
        this.boardService.archivedTasks.length = 0;
        response?.forEach((task: IArchive) => this.boardService.archivedTasks.push(task))
      }));
  }

  public archiveTask$(task_id: number, archive: boolean, board_id: number): Observable<IArchive> {
    return this.http.post<IArchive>(`/api/board/${board_id}/archive/task/${task_id}`, {archive});
  }
}
