import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {RegComponent} from "./pages/signup-page/reg.component";
import {LoginComponent} from "./pages/login-page/login.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    RegComponent,
    LoginComponent
  ],
})
export class AuthModule {}
