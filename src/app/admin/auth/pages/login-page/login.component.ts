import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from 'src/app/admin/auth/services/auth.service';
import {TokenService} from "../../services/storage/token.service";
import {ErrorService} from "../../../../shared/services/error/error.service";
import {IAuthResponse, ISingIn} from "../../interfaces/auth.interfaces";
import {SingInGoogleService} from "../../services/google/singInGoogle.service";

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
    public errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private singInGoogleService: SingInGoogleService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter data';
      }
    })
  }

  public signInWithGoogle(): void {
    this.singInGoogleService.signIn();
  }

  public submit() {
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
