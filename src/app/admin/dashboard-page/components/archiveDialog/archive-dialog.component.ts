import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiTaskService} from "../../../services/api.task.service";
import {BoardService} from "../../../services/board.service";
import {IArchive, ITask} from "../../../../interfaces";

export interface IDataReturnColumnTask {
  task: ITask,
  columns: string[],
  owner: boolean
}

export interface IColumnMatDialogRef {
  task: ITask,
  column: string
}

@Component({
  selector: 'dialog-data-archive-task',
  templateUrl: './archive-dialog.component.html',
  styleUrls: ['./archive-dialog.component.scss']
})
export class ArchiveDialogComponent {
  public columns: string[] = [];
  public task: ITask;
  public owner!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDataReturnColumnTask,
    public dialogRef: MatDialogRef<IColumnMatDialogRef>,
    public apiTaskService: ApiTaskService,
    private boardService: BoardService
  ) {
    this.task = data.task;
    this.columns = data.columns;
    this.owner = data.owner;
  }

  public returnColumn(column: string): void {
    if(this.owner) {
      this.apiTaskService.returnColumn$(this.task.id, column).subscribe((task: ITask) => {
        this.boardService.archivedTasks = this.boardService.archivedTasks.filter((data: IArchive) => data.id !== this.task.id);
        this.dialogRef.close({task, column});
      })
    }
  }
}
