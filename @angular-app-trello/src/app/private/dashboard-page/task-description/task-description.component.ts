import {Component, Inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormControl} from "@angular/forms";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../../services/task.service";
import {ArchiveTasksService} from "../../../services/archive.tasks.service";
import {AssignedService} from "../../../services/assigned.service";
import {TransactionService} from "../../../services/transaction.service";
import {
  DialogData,
  IArchive,
  IDescriptionUpdate,
  IResAssigned,
  IResTransaction,
  ITransaction,
  IUAssigned
} from "../../../interfaces";


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

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public dialogRef: MatDialogRef<TaskDescriptionComponent>,
    private router: Router,
    private route: ActivatedRoute,
    public taskService: TaskService,
    public archiveService: ArchiveTasksService,
    private assignedService: AssignedService,
    private transactionService: TransactionService
  ) {
    this._taskId = data.item.id;
    this._boardId = this.data.board;
    this._title = data.item.title;
    this.description = new FormControl(this.data.item.description);
  }

  ngOnInit(): void {
    this.allUsersAssigned();
  }

  allUsersAssigned() {
    this.assignedService.allUsers$({
        taskId: this._taskId,
        boardId: this._boardId
      }
    ).subscribe((data: IResAssigned) => {
      data.allUsers.forEach((user: IUAssigned) => {
        if (user.name !== data.owner.name) {
          this.users.push(user);
        }
      });
      data.userAssigned.forEach((user: any) => {
        if (user.name !== data.owner.name) {
          this.assignedUsers.push(user)
        }
      })
    })
  }

  close() {
    this.dialogRef.close(this.assignedUsers);
  }

  assignUser(user: IUAssigned) {
    this.assignedService.assignUser$(
      {
        userId: user.id,
        taskId: this._taskId,
        boardId: this._boardId
      }).subscribe((user: IUAssigned) => {
      if (!user.exist) {
        this.assignedUsers.push(user);
      }
    })
  }

  removeAssignedUser(user: IUAssigned) {
    this.assignedService.removeAssignedUser$({
      userId: user.id,
      taskId: this._taskId,
      boardId: this._boardId
    }).subscribe((data: IUAssigned) => {
        this.assignedUsers = this.assignedUsers.filter((user: IUAssigned) => user.id !== user.id);
      });
  }

  transaction() {
    this.transactionTask.length = 0;
    this.transactionService.fetchTransaction(this._taskId, this._boardId)
      .subscribe((data: IResTransaction[]) => {
        data.forEach((transaction: IResTransaction) => {
          if (transaction.transaction === 'creation') {
            this.transactionTask.push({
              transaction: 'creation',
              data: `Пользователь (${transaction.name_user}) создал задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }
          if (transaction.transaction === 'fixing_a_task') {
            this.transactionTask.push({
              transaction: 'fixing_a_task',
              data: `Пользователь (${transaction.name_user}) изменил задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }

          if (transaction.transaction === 'moving') {
            this.transactionTask.push({
              transaction: 'moving',
              data: `${transaction.name_user} переместил задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
          }

          if (transaction.transaction === 'assigned_users') {
            this.transactionTask.push({
              transaction: 'assigned_users',
              data: `Пользователь (${transaction.name_user}) назначен на задачу.
              время: ${formatDate(transaction.createdAt, 'medium', 'ru', '+0300')}`
            });
            this.transactionTask = this.transactionTask.filter((user: any) => user.id !== transaction.id);
          }
        })
      })
  }

  updateTitle() {
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

          this.taskService.updateTitle$(this._taskId, this._title)
            .subscribe((data) => {
              this._title = data.title;
            })
        });
      }
    }
  }

  showDetails() {
    if (this.transactionDialog) {
      this.transactionDialog = false;
    } else {
      this.transaction();
      this.transactionDialog = true;
    }
  }

  archive() {
    const task: IArchive = this.data.item;

    this.archiveService.setArchive$(task)
      .subscribe(() => {
        this.archiveService.archivedTasks[0].push(task);
      })
  }

  submit() {
    const descriptionUpdate: IDescriptionUpdate = {
      id: this._taskId,
      description: this.description.value
    }

    this.taskService.updateDescription(descriptionUpdate)
      .subscribe((task) => {
        this.data.item.description = task.description;
      });
  }
}

