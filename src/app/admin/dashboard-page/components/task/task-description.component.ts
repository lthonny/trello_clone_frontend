import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormControl} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {
  IArchive,
  IHistoryTask,
  ITransaction,
  IUAssigned,
} from "../../../../interfaces";
import {IDialogData} from "../../interfaces/dashboard.interfaces";
import {ApiTaskService} from "../../../services/api.task.service";
import {ApiBoardService} from "../../../services/api.board.service";


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss']
})
export class TaskDescriptionComponent implements OnInit {

  public _taskId: number;
  private _boardId: number;
  public _title: string = '';
  public description!: FormControl;

  public showTitle: boolean = false;
  public users: IUAssigned[] = [];
  public assignedUsers: IUAssigned[] = [];

  public transactionTask: ITransaction[] = [];
  public transactionDialog: boolean = false;

  public ownerStatus!: boolean;
  public userId: null | string = localStorage.getItem('id');

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
    public dialogRef: MatDialogRef<TaskDescriptionComponent>,
    public router: Router,
    public route: ActivatedRoute,
    public taskService: ApiTaskService,
    public apiBoardService: ApiBoardService,
  ) {
    this.users = data.users;
    this._taskId = data.item.id;
    this._boardId = this.data.board;
    this._title = data.item.title;
    this.description = new FormControl(this.data.item.description);
  }

  ngOnInit(): void {
    this.allUsersAssigned();
  }

  public allUsersAssigned(): void {
    // this.boardService.getAllAssignedUsers$(this._taskId, this._boardId)
      // .subscribe((data: IResAssigned) => {
        // console.log();
        // data.allUsers.forEach((user: IUAssigned) => {
        //   if (user.name !== data.owner.name) {
        //     this.users = this.users.filter((data: IUAssigned) => data.id !== user.id);
        //     this.users.push(user);
        //   }
        // });
        // data.userAssigned.forEach((user) => {
        //   if (user.name !== data.owner.name) {
        //     this.assignedUsers = this.assignedUsers.filter((data: IUAssigned) => data.id !== user.id);
        //     this.assignedUsers.push(user);
        //   }
        // })
      // })
    console.log(this.users)
  }

  public close(): void {
    this.dialogRef.close(this.assignedUsers);
  }

  public assignUser(user: IUAssigned): void {
    // this.taskService.createAssignedUser$(user.id, this._taskId, this._boardId)
    //   .subscribe((user: any) => {
    //     console.log(user);
    //     // if (!user.exist) {
    //       this.assignedUsers.push(user);
    //     // }
    //   })
  }

  public removeAssignedUser(user: IUAssigned): void {
    // this.assignedService.removeAssignedUser$(user.id, this._taskId, this._boardId)
    //   .subscribe((data: string) => {
    //     this.assignedUsers = this.assignedUsers.filter((user: IUAssigned) => user.id !== user.id);
    //   });
  }

  public transaction(): void {
    this.transactionTask.length = 0;
    this.taskService.getHistory$(this._taskId)
      .subscribe((data: IHistoryTask[]) => {
        data.forEach((transaction: IHistoryTask) => {
          if (transaction.transaction === 'creation') {
            this.transactionTask.push({
              id: transaction.id,
              transaction: 'creation',
              data: `Пользователь (${transaction.name_user}) создал задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
          if (transaction.transaction === 'fixing_a_task') {
            this.transactionTask.push({
              id: transaction.id,
              transaction: 'fixing_a_task',
              data: `Пользователь (${transaction.name_user}) изменил задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
          if (transaction.transaction === 'moving') {
            this.transactionTask.push({
              id: transaction.id,
              transaction: 'moving',
              data: `${transaction.name_user} переместил задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
          if (transaction.transaction === 'assigned_users') {
            this.transactionTask.push({
              id: transaction.id,
              transaction: 'assigned_users',
              data: `Пользователь (${transaction.name_user}) назначен на задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
        })
      })
  }

  public updateTitle(): void {
    if (this.data.ownerStatus) {
      const titleBoard = document.querySelector('.dialog-column-title');

      if (titleBoard !== null) {
        const childNode = titleBoard.firstChild;

        if (childNode !== null) {
          titleBoard.removeChild(childNode);
          const input = document.createElement('input');
          input.value = this._title;
          titleBoard.append(input);

          input.focus();

          input.addEventListener('blur', () => {
            titleBoard.innerHTML = input.value;
            this._title = input.value;

            this.taskService.updateTitleTask$(this._taskId, this._title)
              .subscribe((data) => {
                this._title = data.title;
              })
          });
        }
      }
    }
  }

  public showDetails(): void {
    if (this.transactionDialog) {
      this.transactionDialog = false;
    } else {
      this.transaction();
      this.transactionDialog = true;
    }
  }

  public archive(): void {
    const task: IArchive = this.data.item;
    this.apiBoardService.archiveTask$(task.id, task.archive, task.board_id)
      .subscribe(() => {
        this.dialogRef.close(this.data);
      })
  }

  public submit(): void {
    if (this.data.ownerStatus) {
      this.taskService.updateDescriptionTask$(this._taskId, this.description.value)
        .subscribe((task) => {
          this.data.item.description = task.description;
        });
    }
  }
}

