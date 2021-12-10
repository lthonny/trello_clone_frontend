import {Injectable} from "@angular/core";
import {IArchive, ITask} from "../../interfaces";

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
}
