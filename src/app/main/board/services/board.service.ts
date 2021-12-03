import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBoard, IInviteKey, IResBoard, IUpdateBoardTitle} from "../../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(
    private http: HttpClient
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

  public updateBoard$(board_id: number, title: string): Observable<IUpdateBoardTitle> {
    return this.http.put<IUpdateBoardTitle>(`/api/board/${board_id}`, {title});
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

  public getInviteKey$(board_id: number): Observable<IInviteKey> {
    return this.http.get<IInviteKey>(`/api/board/${board_id}/invite/key`);
  }

  public getInviteBoard$(key: string | null, board_id: string | null | number): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/board/${board_id}/invite/key/${key}`);
  }

  public leaveBoard$(board_id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/board/${board_id}/invite/leave`);
  }
}
