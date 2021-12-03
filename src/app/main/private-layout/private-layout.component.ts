import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from 'src/app/main/auth/services/auth.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent implements OnInit {

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
