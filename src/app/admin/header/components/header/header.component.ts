import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/admin/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout$()
      .subscribe(() => {
        this.router.navigate(['/']);
      }, () => {
        this.router.navigate(['/']);
      });
  }
}
