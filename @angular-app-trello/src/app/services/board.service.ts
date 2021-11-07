import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs";

import {IBoard} from "../interfaces";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly _idBoard: string | null = localStorage.getItem('id');
  private readonly _keyBoard: string  = '';
  public _nameBoard: string  = '';

  set isIdBoard(id) {
    this.isIdBoard = id;
  }

  get isIdBoard() {
    return this._idBoard;
  }

  get isKeyBoard() {
    return this._keyBoard;
  }

  constructor(
    private http: HttpClient
  ) {}

  public getBoard$(id: number): Observable<any> {
    return this.http.get<any>(`/api/board/${id}`);
  }

  public getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/boards/${this._idBoard}`);
  }

  public createBoard$(title: string): Observable<IBoard> {
    this._nameBoard = title;
    return this.http.post<IBoard>(`/api/board/create/${this._idBoard}`, {name: title});
  }

  public updateBoard$(idBoard: number, title: string, idUser: string | null): Observable<any> {
    return this.http.post<any>(`/api/board/update/${idBoard}`, {title, idUser});
  }

  public removeBoard$(id: number): Observable<any> {
    return this.http.delete(`/api/board/${id}`);
  }
}
