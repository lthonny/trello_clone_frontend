import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ITransaction} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private http: HttpClient,
  ) {}

  createTransaction() {}

  public fetchTransaction(id: number, board_id: number): Observable<ITransaction[]> {
    return this.http.post<ITransaction[]>(`/api/task/transaction/${id}`, {board_id});
  }
}
