import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SingInGoogleService {
  constructor() {}

  public signIn(): void {
    window.open("http://localhost:5000/auth/google", "_self");
  }
}
