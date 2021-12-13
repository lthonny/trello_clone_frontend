import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SingInGoogleService {
  private readonly api: string = environment.api;

  constructor() {}

  public signIn(): void {
    window.open(`${this.api}/auth/google`, "_self");
  }
}
