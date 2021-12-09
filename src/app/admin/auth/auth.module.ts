import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RegComponent} from "./pages/signup-page/reg.component";
import {LoginComponent} from "./pages/login-page/login.component";
import {GoogleAuthComponent} from "./pages/google-auth/google-auth.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    RegComponent,
    LoginComponent,
    GoogleAuthComponent
  ],
})
export class AuthModule {}
