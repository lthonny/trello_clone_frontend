import {Injectable} from "@angular/core";
import {Board} from "../../dashboard/pages/models/board.model";
import {Column} from "../../dashboard/pages/models/column.model";

import {BoardService} from "./board.service";
import {TaskService} from "../../dashboard/services/task.service";
import {ArchiveService} from "../../dashboard/services/archive.service";

import {IArchive, ICreateTask, IInvitedUser, ITask} from "../../../interfaces";
import {IColumns, IDialogData} from "../../dashboard/interfaces/dashboard.interfaces";
import {DashboardPageComponent} from "../../dashboard/pages/dashboard/dashboard-page.component";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  public _owner: boolean = true;
  public _boardId!: number;
  public _boardName!: string;

  public readonly ColumnsType = ['To Do', 'In Progress', 'Coded', 'Testing', 'Done'];

  // public taskListToDo: ITask[] = [];
  // public taskListInProgress: ITask[] = [];
  // public taskListCoded: ITask[] = [];
  // public taskListTesting: ITask[] = [];
  // public taskListDone: ITask[] = [];

  // board: Board = new Board('tasks', [
  //   new Column(IColumns[0], this.taskListToDo),
  //   new Column(IColumns[1], this.taskListInProgress),
  //   new Column(IColumns[2], this.taskListCoded),
  //   new Column(IColumns[3], this.taskListTesting),
  //   new Column(IColumns[4], this.taskListDone)
  // ]);

  // public taskLists = [this.taskListToDo, this.taskListInProgress, this.taskListCoded, this.taskListTesting, this.taskListDone];

  // public _users: IInvitedUser[] = [];

  constructor(
    private boardService: BoardService,
    private taskService: TaskService,
    private archiveService: ArchiveService
  ) {
  }

  public getBoardData(board_id: number): void {
    this.boardService.getTasksBoard$(this._boardId).subscribe((data) => {
      this._owner = data.owner;
      this._boardName = data.title;
      // this._users = data.users;

      if (data.tasks) {
        // this.sortTasks(data.tasks);

        // data.tasks.forEach((task: ITask) => {
        //   if (task.nameTaskList === IColumns[0] && task.archive !== true) {
        //     this.taskListToDo.push(task);
        //   }
        //   if (task.nameTaskList === IColumns[1] && task.archive !== true) {
        //     this.taskListInProgress.push(task);
        //   }
        //   if (task.nameTaskList === IColumns[2] && task.archive !== true) {
        //     this.taskListCoded.push(task);
        //   }
        //   if (task.nameTaskList === IColumns[3] && task.archive !== true) {
        //     this.taskListTesting.push(task);
        //   }
        //   if (task.nameTaskList === IColumns[4] && task.archive !== true) {
        //     this.taskListDone.push(task);
        //   }
        // })
      }
    })
  }

  public getDataFullMenu(board_id: number): void {
    // this.archiveService.getArchivedTasks$(board_id).subscribe((data: ITask[]) => {
    //   this.archiveService.archivedTasks = [];
    //   data?.forEach((task) => this.archiveService.archivedTasks.push(task));
    // })
  }

  public updateTitleBoard(board_id: number, title: string): void {
  }

  public createTask(task: ICreateTask): void {
    // this.taskService.createTask$(task).subscribe((task: ITask) => {
    //   this.taskLists.forEach((column: ITask[], i: number) => {
    //     if (task.nameTaskList === IColumns[i]) {
    //       column.push(task);
    //     }
    //   })
    // })
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

  // public unzip(task: ITask): void {
  //   this.archiveService.archiveTask$(task.id, task.archive, task.board_id)
  //     .subscribe(() => {
  //       for (let i = 0; i < this.board.columns.length; i++) {
  //         if (this.board.columns[i].name === task.nameTaskList) {
  //           this.board.columns[i].tasks.push(task);
  //         }
  //       }
  //       this.archiveService.archivedTasks = this.archiveService.archivedTasks.filter((data: IArchive) => data.id !== task.id);
  //     })
  // }

  public leaveBoard(board_id: number): void {
    this.boardService.leaveBoard$(board_id).subscribe(() => {});
  }

  // public getDialogRef(result: IDialogData): void {
  //   this.taskLists.forEach((column: ITask[], i: number) => {
  //     if (result.item.nameTaskList === IColumns[i]) {
  //       const index = column.findIndex((task: ITask) => task.id === result.item.id);
  //       if (index !== -1) {
  //         column.splice(index, 1);
  //         this.archiveService.archivedTasks.push(result.item);
  //       }
  //     }
  //   })
  // }

  // public deleteTask(task_id: number, name: string): void {
  //   if (this._owner) {
  //     this.taskService.deleteTask$(task_id).subscribe((data) => {
  //       this.ColumnsType.forEach((taskName: string, i: number) => {
  //         if (taskName === name) {
  //           this.taskLists[i] = this.taskLists[i].filter((task: ITask) => task.id !== task_id);
  //           this.board.columns[i].tasks = this.taskLists[i].filter((task: ITask) => task.id !== task_id);
  //         }
  //       });
  //     })
  //   }
  // }

  // public deleteColumnTasks(board_id: number, column: string): void {
  //   if (column) {
  //     this.boardService.deleteTasksColumn$(board_id, column)
  //       .subscribe((data) => {
  //         this.ColumnsType.forEach((allNameTaskList: string, i: number) => {
  //           if (column === allNameTaskList && 'all tasks in this column have been deleted') {
  //             this.taskLists[i].length = 0;
  //           }
  //         })
  //       })
  //   }
  // }

  public deleteAccessUser(board_id: number, user_id: number): void {
    this.boardService.deleteUserAccess$(board_id, user_id).subscribe(() => {
  //     this._users = this._users.filter((data) => data.id !== user_id);
    });
  }
}
