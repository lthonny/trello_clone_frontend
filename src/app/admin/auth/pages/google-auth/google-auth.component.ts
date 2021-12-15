import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ISingIn} from "../../interfaces/auth.interfaces";
import {TokenService} from "../../services/storage/token.service";

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {
  private email!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.email = params['id']);

    const user: ISingIn = {
      email: this.email,
      password: 'google'
    }

    this.authService.singIn$(user).subscribe((response) => {
      this.tokenService.setToken(response.accessToken);
      this.router.navigate(['/admin', 'boards']);
    })
  }
}
