import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IResTransaction} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private http: HttpClient,
  ) {}

  public fetchTransaction(id: number, board_id: number): Observable<IResTransaction[]> {
    return this.http.post<IResTransaction[]>(`/api/task/transaction/${id}`, { board_id });
  }
}
