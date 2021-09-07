import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {

  authMenu: boolean = false;

  constructor(
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.auth.Logout().subscribe(() => {
      this.auth.RemoveToken();
      // this.auth.setAuth(false);
    });
      // console.log(response);
      //   this.auth.RemoveToken(response.tokens.accessToken);
      // });
    this.router.navigate(['/admin', 'login']);
  }

}
