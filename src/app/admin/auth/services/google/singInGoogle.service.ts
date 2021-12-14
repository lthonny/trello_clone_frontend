import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SingInGoogleService {
  constructor() {}

  public signIn(): void {
    window.open(`${environment.SERVER_URL}/auth/google`, "_self");
  }
}
