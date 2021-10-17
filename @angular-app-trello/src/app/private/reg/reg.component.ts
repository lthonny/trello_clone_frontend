import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IAuthResponse, ISingUp} from 'src/app/interfaces';
import {AuthService} from 'src/app/services/auth.service';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  submitted: boolean = false;
  message: string = '';

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

  ngOnInit(): void {}

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
        this.router.navigate(['/admin', 'login']);
      });
  }

  signInHandler() {
    this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then((data: SocialUser) => {
      const user: ISingUp = {
        name: data.name,
        email: data.email
      }

      console.log('google data', data);
      console.log('google user', user);

      this.authService.singUp$(user).subscribe(() => {
        console.log('данные отправлены');
      })

      // localStorage.setItem('google_auth', JSON.stringify(data));
      // this.router.navigateByUrl('/admin/boards').then();
    })
  }
}
