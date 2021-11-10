import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

import {IAuthResponse, ISingUp} from 'src/app/interfaces';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent {
  public submitted: boolean = false;
  public message: string = '';

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
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
    private authServiceGoogle: SocialAuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: ISingUp = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.singUp$(user)
      .subscribe((user: IAuthResponse) => {
        this.form.reset();
        this.router.navigate(['/admin', 'login-page']);
      });
  }

  signInWithGoogle(): void {
    // this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
    //
    // })

    this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
      const user: ISingUp = {
        name: data.name,
        email: data.email,
        // auth
        // token_id:
      }


      console.log('google data', data);
    //   console.log('google user', user);
    //
    //   this.authService.singUpGoogle$(user).subscribe(() => {
    //     console.log('данные отправлены');
    //   })
    //
    //   // localStorage.setItem('google_auth', JSON.stringify(data));
    //   // this.router.navigateByUrl('/admin/boards-page').then();
    })
  }
}
