import {NgModule} from "@angular/core";
import {ApiBoardService} from "../api.board.service";
import {ApiTaskService} from "../api.task.service";
import {BoardService} from "../board.service";
import {TaskService} from "../task.service";
import {GoogleAuthComponent} from "../../auth/pages/google-auth/google-auth.component";

@NgModule({
  providers: [
    ApiBoardService,
    ApiTaskService,
    BoardService,
    TaskService,
    GoogleAuthComponent
  ]
})
export class ApiModule {}
