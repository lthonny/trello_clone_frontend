import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public error$: Subject < string > = new Subject<string>();

  public handleError(error: HttpErrorResponse) {
    const {message} = error.error;

    switch (message) {
      case 'User was not found':
        this.error$.next('User was not found');
        break;
      case 'Incorrect password':
        this.error$.next('Incorrect password');
        break;
    }

    return throwError(message);
  }
}
