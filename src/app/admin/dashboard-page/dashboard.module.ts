import {NgModule} from "@angular/core";
import {DashboardPageComponent} from "./components/dashboard/dashboard-page.component";
import {TaskDescriptionComponent} from "./components/task/task-description.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchPipe} from "../../shared/pipes/search.pipe";
import {ArchiveDialogComponent} from "./components/archiveDialog/archive-dialog.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardPageComponent,
    TaskDescriptionComponent,
    ArchiveDialogComponent,
    SearchPipe
  ]
})
export class DashboardModule {}
