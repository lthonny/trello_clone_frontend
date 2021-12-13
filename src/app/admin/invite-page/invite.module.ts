import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import { InvitePageComponent } from './components/invite-page/invite-page.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InvitePageComponent
  ]
})
export class InviteModule {}
