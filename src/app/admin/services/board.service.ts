import {Injectable} from "@angular/core";
import {IArchive, ITask} from "../../interfaces";
import {ApiBoardService} from "./api.board.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public archivedTasks: IArchive[] = [];

  public readonly ColumnsType = ['To Do', 'In Progress', 'Coded', 'Testing', 'Done'];

  constructor(
  ) {
  }

  public sortTasks(tasks: ITask[]): void {
    tasks.sort((a: ITask, b: ITask) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    })
  }

  public deleteAccessUser(board_id: number, user_id: number): void {
    // this.apiBoardService.deleteUserAccess$(board_id, user_id).subscribe(() => {});
  }
}
