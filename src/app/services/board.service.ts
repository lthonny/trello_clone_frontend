import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBoard, IUpdateBoardTitle} from "../interfaces";

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

  public getBoard$(id: number): Observable<IBoard> {
    return this.http.get<IBoard>(`/api/board/getAllTasks/${id}`);
  }

  public getBoards$(id: null | string): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/board/getAllBoards/${id}`);
  }

  public createBoard$(id: null | string, title: string): Observable<IBoard> {
    this._nameBoard = title;
    return this.http.post<IBoard>(`/api/board/create/${id}`, {name: title});
  }

  public updateBoard$(idBoard: number, title: string, idUser: string | null): Observable<IUpdateBoardTitle> {
    return this.http.post<IUpdateBoardTitle>(`/api/board/update/${idBoard}`, {title, idUser});
  }

  public removeBoard$(user_id: string | null, id: number): Observable<string> {
    return this.http.post<string>(`/api/board/delete/${id}`, {user_id});
  }
}