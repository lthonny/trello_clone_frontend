import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {BoardsComponent} from "./components/boards-page/boards.component";
import {AddBoardComponent} from "./components/add-board/add-board.component";

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BoardsComponent,
    AddBoardComponent
  ]
})
export class BoardModule {}
