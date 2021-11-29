import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBoard, IResAllTasks, IUpdateBoardTitle} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly _keyBoard: string = '';
  public _nameBoard: string = '';

  get isKeyBoard() {
    return this._keyBoard;
  }

  constructor(
    private http: HttpClient
  ) {
  }

  public getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/board`);
  }

  public getTasksBoard$(id: number): Observable<IResAllTasks> {
    return this.http.get<IResAllTasks>(`/api/board/tasks/${id}`);
  }

  public createBoard$(title: string): Observable<IBoard> {
    this._nameBoard = title;
    return this.http.post<IBoard>(`/api/board/create`, {name: title});
  }

  public updateBoard$(idBoard: number, title: string): Observable<IUpdateBoardTitle> {
    return this.http.post<IUpdateBoardTitle>(`/api/board/update/${idBoard}`, {title});
  }

  public removeBoard$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`/api/board/${id}`);
  }
}
