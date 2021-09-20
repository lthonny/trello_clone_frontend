import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISingIn } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import {TokenService} from "../../services/token.service";
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  signIpSub!: Subscription;
  submitted: boolean = false;
  message: string = '';

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
    public authService: AuthService,
    public tokenService: TokenService,
    public errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter data';
      }
    })
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

    this.signIpSub = this.authService.singIn$(user)
      .subscribe((response) => {
        this.tokenService.setToken$(response.accessToken);
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy() {
    if (this.signIpSub) {
      this.signIpSub.unsubscribe();
    }
  }

}
