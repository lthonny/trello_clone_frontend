import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {TokenService} from "../../../services/token.service";
import {ErrorService} from "../../../services/error.service";

import {IAuthResponse, ISingIn, ISingUp} from 'src/app/interfaces';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message: string = '';
  public submitted: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private authServiceGoogle: SocialAuthService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter data';
      }
    })
  }

  signInWithGoogle(): void {
    // this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
    //   const user: ISingUp = {
    //     name: data.name,
    //     email: data.email,
    //     // auth
    //     // token_id:
    //   }


      console.log('google data');
    // })
  }


  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: ISingIn = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.singIn$(user)
      .subscribe((response: IAuthResponse) => {
        this.tokenService.setToken(response.accessToken);
        this.form.reset();
        this.router.navigate(['/admin', 'boards']);
      });
  }
}
