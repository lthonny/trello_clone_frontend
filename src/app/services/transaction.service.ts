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

  public fetchTransaction$(id: number): Observable<IResTransaction[]> {
    return this.http.get<IResTransaction[]>(`/api/transaction/${id}`);
  }
}
