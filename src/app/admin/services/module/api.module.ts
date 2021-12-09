import {NgModule} from "@angular/core";
import {ApiBoardService} from "../api.board.service";
import {ApiTaskService} from "../api.task.service";
import {BoardService} from "../board.service";
import {TaskService} from "../task.service";
import {SingInGoogleService} from "../../auth/services/singInGoogle.service";

@NgModule({
  providers: [
    ApiBoardService,
    ApiTaskService,
    BoardService,
    TaskService,
    SingInGoogleService
  ]
})
export class ApiModule {}
