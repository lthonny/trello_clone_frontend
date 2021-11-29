import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';

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
    private router: Router
  ) {
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    this.receiveMessage(event);
  }

  receiveMessage(event: any) {
    if (event.origin !== "http://localhost:4200") {
      return;
    } // (<any>window).popup.postMessage("successfull", "http://localhost:4200");
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
        this.router.navigate(['/admin', 'login-page']);
      });
  }

  signInWithGoogle() {
    window.open('http://localhost:5000/auth/google', "_self");
    // window.open('http://localhost:5000/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    // let listener = window.addEventListener('message', (message) => {
    //   //message will contain google user and details
    //   console.log(message);
    // });
  }

  logout() {
    window.open('http://localhost:5000/auth/logout', "_self");
  }
}
