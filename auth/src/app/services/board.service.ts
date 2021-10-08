import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {IBoard} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _id: string | null = localStorage.getItem('id');

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  public getBoards$(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`/api/boards/${this._id}`);
  }

  public createBoard$(board: string): any {
    return this.http.post(`/api/board/create/${this._id}`, {name: board});
  }

  public deleteBoard$(id: any): any {
    return this.http.delete(`/api/board/${id}`);
  }

  public updateBoard(id: string, name: string): any {
    return this.http.post(`/api/update/${id}`, name);
  }
}
