import {NgModule} from "@angular/core";
import {DashboardPageComponent} from "./components/dashboard/dashboard-page.component";
import {TaskDescriptionComponent} from "./components/task/task-description.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchPipe} from "../../shared/pipes/search.pipe";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardPageComponent,
    TaskDescriptionComponent,
    SearchPipe
  ]
})
export class DashboardModule {}
