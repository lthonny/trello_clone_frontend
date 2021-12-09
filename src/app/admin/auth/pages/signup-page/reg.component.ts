import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/admin/auth/services/auth.service';
import {IAuthResponse, ISingUp} from "../../interfaces/auth.interfaces";
import {SingInGoogleService} from "../../services/singInGoogle.service";

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
    private router: Router,
    private singInGoogleService: SingInGoogleService
  ) {
  }

  public signInWithGoogle(): void {
    this.singInGoogleService.signIn();
  }

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
}