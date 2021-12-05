import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {InviteComponent} from "./components/invite/invite.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InviteComponent
  ]
})
export class InviteModule {}
