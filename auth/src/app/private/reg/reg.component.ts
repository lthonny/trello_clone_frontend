import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISingUp } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {

  signUpSub!: Subscription;

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
    private router: Router
  ) { }

  ngOnInit(): void {
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

    this.signUpSub = this.authService.singUp(user)
      .subscribe(() => console.log('пользователь добавлен'));

    this.form.reset();
    this.authService.setAuth(true);
    this.router.navigate(['/admin', 'login'])
  }

  ngOnDestroy() {
    // if (this.signUpSub) {
    //   this.signUpSub.unsubscribe();
    // }
  }

}
