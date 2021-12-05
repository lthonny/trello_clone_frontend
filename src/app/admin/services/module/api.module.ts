import {NgModule} from "@angular/core";
import {ApiBoardService} from "../api.board.service";
import {ApiTaskService} from "../api.task.service";
import {BoardService} from "../board.service";
import {TaskService} from "../task.service";

@NgModule({
  providers: [
    ApiBoardService,
    ApiTaskService,
    BoardService,
    TaskService,
  ]
})
export class ApiModule {}
