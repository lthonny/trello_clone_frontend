import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public auth: AuthService
  ) {
    // if (localStorage.getItem('token')) {
    //   @angular-app-trello.refresh();
    // }
  }
}
