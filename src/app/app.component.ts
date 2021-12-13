import { Component } from '@angular/core';
import {AuthService} from "./admin/auth/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'TrelloClone';
  constructor(
    public auth: AuthService
  ) {}
}
