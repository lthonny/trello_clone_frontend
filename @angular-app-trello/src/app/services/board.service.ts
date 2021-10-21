import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable} from "rxjs";

import {IBoard} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _id: string | null = localStorage.getItem('id');

  constructor(
    private http: HttpClient
  ) {
  }

  public getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/boards/${this._id}`);
  }

  public createBoard$(title: string): Observable<IBoard> {
    return this.http.post<IBoard>(`/api/board/create/${this._id}`, {name: title});
  }

  public updateBoard$(id: number, name: string): Observable<any> {
    return this.http.post<any>(`/api/board/update/${id}`, {name});
  }

  public removeBoard$(id: number): Observable<any> {
    return this.http.delete(`/api/board/${id}`);
  }
}
