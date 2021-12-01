import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {switchMap} from "rxjs/operators";

import {TaskService} from "../../services/task.service";
import {BoardService} from "../../services/board.service";
import {InviteService} from "../../services/invite.service";
import {ArchiveService} from "../../services/archive.service";
import {AuthService} from "../../services/auth/auth.service";
import {AssignedService} from "../../services/assigned.service";

import {
  DialogData,
  IArchive,
  IColumn,
  ICreateTask,
  IInvitedUser,
  IInviteKey,
  ITask
} from "../../interfaces";

import {Board} from "../../models/board.model";
import {Column} from "../../models/column.model";

import {TaskDescriptionComponent} from "./task-description/task-description.component";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public owner: boolean = true;
  private _boardId!: number;
  public _boardName!: string;
  public _key!: string;
  public link!: string;
  public invite: boolean = true;
  public submitted: boolean = true;

  public searchTask: string = '';

  public invitedUsers: IInvitedUser[] = [];

  public tasks: ITask[] = [];
  private taskListToDo: ITask[] = [];
  private taskListInProgress: ITask[] = [];
  private taskListCoded: ITask[] = [];
  private taskListTesting: ITask[] = [];
  private taskListDone: ITask[] = [];

  public archivedTasks: ITask[] = [];

  board: Board = new Board('tasks', [
    new Column('To Do', this.taskListToDo),
    new Column('In Progress', this.taskListInProgress),
    new Column('Coded', this.taskListCoded),
    new Column('Testing', this.taskListTesting),
    new Column('Done', this.taskListDone)
  ]);

  private readonly allNameTaskList = ['To Do', 'In Progress', 'Coded', 'Testing', 'Done'];
  private readonly taskLists = [this.taskListToDo, this.taskListInProgress, this.taskListCoded, this.taskListTesting, this.taskListDone];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
    public authService: AuthService,
    public boardService: BoardService,
    public archiveService: ArchiveService,
    private dialog: MatDialog,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private tasksService: TaskService,
    public assignedService: AssignedService,
    private router: Router
  ) {
    this.route.params.subscribe(params => this._boardId = params['id']);
    this.boardService.getTasksBoard$(this._boardId)
      .subscribe((board) => this._boardName = board.title);
  }

  ngOnInit(): void {
    this.fetchAllTasks();
    this.getOwner();
    this.getInvitedUsers();
  }

  getInvitedUsers(): void {
    this.inviteService.inviteUsers$(this._boardId)
      .subscribe((data: IInvitedUser[]) => {
        data.forEach((user: IInvitedUser) => {
          this.invitedUsers = this.invitedUsers.filter((data) => data.id !== user.id);
          this.invitedUsers.push({id: user.id, name: user.name, owner: user.owner});
        });
      }, (error) => {
        console.log(error);
      })
  }

  getOwner(): void {
    this.inviteService.getOwner$(this._boardId).subscribe(({title, owner}) => {
      this.owner = owner;
      this._boardName = title;
    })
  }

  fetchAllTasks(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.boardService.getTasksBoard$(params['id']);
      }))
      .subscribe((tasks) => {
        if (tasks.tasks) {
          this.tasks = tasks.tasks;
          this._boardName = tasks.title;

          this.sortTasks(this.tasks);

          this.tasks.forEach((task: ITask) => {
            if (task.nameTaskList === 'To Do' && task.archive !== true) {
              this.taskListToDo.push(task);
            }
            if (task.nameTaskList === 'In Progress' && task.archive !== true) {
              this.taskListInProgress.push(task);
            }
            if (task.nameTaskList === 'Coded' && task.archive !== true) {
              this.taskListCoded.push(task);
            }
            if (task.nameTaskList === 'Testing' && task.archive !== true) {
              this.taskListTesting.push(task);
            }
            if (task.nameTaskList === 'Done' && task.archive !== true) {
              this.taskListDone.push(task);
            }
          })
        }
      })
  }

  openDialog(item: ITask): void {
    const dialogRef = this.dialog.open(TaskDescriptionComponent, {
      data: {
        item,
        ownerStatus: this.owner,
        board: this._boardId,
        invited: this.invitedUsers
      },
      height: '700px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        if (result.item.nameTaskList === 'To Do') {
          const index = this.taskListToDo.findIndex((task: ITask) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListToDo.splice(index, 1);
            this.archiveService.archivedTasks.push(result.item);
          }
        }
        if (result.item.nameTaskList === 'In Progress') {
          const index = this.taskListInProgress.findIndex((task: ITask) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListInProgress.splice(index, 1);
            this.archiveService.archivedTasks.push(result.item);
          }
        }
        if (result.item.nameTaskList === 'Coded') {
          const index = this.taskListCoded.findIndex((task: ITask) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListCoded.splice(index, 1);
            this.archiveService.archivedTasks.push(result.item);
          }
        }
        if (result.item.nameTaskList === 'Testing') {
          const index = this.taskListTesting.findIndex((task: ITask) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListTesting.splice(index, 1);
            this.archiveService.archivedTasks.push(result.item);
          }
        }
        if (result.item.nameTaskList === 'Done') {
          const index = this.taskListDone.findIndex((task: ITask) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListTesting.splice(index, 1);
            this.archiveService.archivedTasks.push(result.item);
          }
        }
      }
    });
  }

  drop(event: CdkDragDrop<ITask[]>, column: IColumn): void {
    if (this.owner) {
      const nameColumn = column.name;

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        event.previousContainer.data.forEach((x: ITask, index) => {
          x.order = index;
        });
      }

      event.container.data.forEach((x: ITask, index) => {
        x.order = index;
      })

      this.sortTasks(event.container.data);
      this.tasksService.updateOrder$(event.container.data).subscribe((data) => {
      })

      if (event.container.data.length >= 0) {
        let newTaskList: ITask[] = [];

        event.container.data.forEach((task: ITask) => {
          newTaskList.push(task);

          if (task.nameTaskList !== nameColumn || task.order !== undefined) {
            this.tasksService.updateNameTaskList$(task, nameColumn).subscribe((data) => {
              // console.log(data);
            });
          }
          return;
        })
      }
    }
  }

  sortTasks(tasks: ITask[]): void {
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

  updateTitleBoard(): void {
    const titleBoard = document.querySelector('.title-board');

    if (titleBoard !== null && this.owner) {
      const childNode = titleBoard.firstChild;

      if (childNode !== null) {
        titleBoard.removeChild(childNode);
        const input = document.createElement('input');
        input.value = this._boardName;
        titleBoard.append(input);

        input.focus();

        input.addEventListener('blur', () => {
          titleBoard.innerHTML = input.value;
          this._boardName = input.value;

          this.boardService.updateBoard$(
            this._boardId,
            this._boardName
          ).subscribe(({id, title, owner}) => {
            this.owner = owner;
            this._boardName = title;
          });
        });

        input.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.keyCode === 13) {
            titleBoard.innerHTML = input.value;
            this._boardName = input.value;

            this.boardService.updateBoard$(
              this._boardId,
              this._boardName)
              .subscribe(({id, title, owner}) => {
                if (title !== this._boardName) {
                  this.owner = owner;
                  this._boardName = title;
                } else {
                  this.owner = owner;
                }
              });
          }
        });
      }
    }
  }

  fullMenu(): void {
    this.archiveService.getArchivedTasks$(this._boardId)
      .subscribe((data: IArchive[]) => {
        data?.forEach((task) => this.archivedTasks.push(task));
      })
  }

  unzip(task: IArchive): void {
    this.archiveService.archiveTask$(task.id, task.archive, task.board_id)
      .subscribe(() => {
        for (let i = 0; i < this.board.columns.length; i++) {
          if (this.board.columns[i].name === task.nameTaskList) {
            this.board.columns[i].tasks.push(task);
          }
        }
        this.archiveService.archivedTasks = this.archiveService.archivedTasks.filter((data: IArchive) => data.id !== task.id);
      })
  }

  inviteKey(): void {
    this.invite = false;

    this.inviteService.getInviteKey$(this._boardId)
      .subscribe((key: IInviteKey) => {
        this._key = key.key;
        this.link = `http://localhost:4200/admin/invite/${this._boardId}/${key.key}`;
      })
  }

  onClose(): void {
    this.submitted = true;
    this.form.reset();
  }

  removeTask(id: number, name: string): void {
    if (this.owner) {
      this.tasksService.delete$(id)
        .subscribe((data) => {
          this.allNameTaskList.forEach((taskName: string, i: number) => {
            if (taskName === name) {
              this.taskLists[i] = this.taskLists[i].filter((task: ITask) => task.id !== id);
              this.board.columns[i].tasks = this.taskLists[i].filter((task: ITask) => task.id !== id);
            }
          });
        })
    }
  }

  removeAllTasks(columnName: string): void {
    if (columnName) {
      this.tasksService.tasksAllDelete$(
        this._boardId,
        columnName
      ).subscribe((data) => {
        this.allNameTaskList.forEach((allNameTaskList: string, i: number) => {
          if (columnName === allNameTaskList && 'all tasks in this column have been deleted') {
            this.taskLists[i].length = 0;
          }
        })
      })
    }
  }

  removeInvited(user: IInvitedUser): void {
    this.inviteService.removeInvitedUsers$(this._boardId, user.id).subscribe(() => {
      this.invitedUsers = this.invitedUsers.filter((data) => data.id !== user.id);
    });
  }

  leaveBoard(): void {
    this.inviteService.leaveBoard$(this._boardId).subscribe(() => {
      this.router.navigate(['/admin', 'boards']);
    });
  }

  submit(nameTaskList: string): void {
    if (this.owner) {
      let order: number = 1;
      let orderSum = undefined;

      if (nameTaskList === 'To Do') {
        orderSum = this.taskListToDo.length;
      }

      if (nameTaskList === 'In Progress') {
        orderSum = this.taskListInProgress.length;
      }

      if (nameTaskList === 'Coded') {
        orderSum = this.taskListCoded.length;
      }

      if (nameTaskList === 'Testing') {
        orderSum = this.taskListTesting.length;
      }

      if (nameTaskList === 'Done') {
        orderSum = this.taskListDone.length;
      }

      if (orderSum) {
        order = orderSum + 1;
      }

      if (
        this.form.value.name !== null &&
        this.form.value.description !== null
      ) {
        const task: ICreateTask = {
          title: this.form.value.name,
          description: this.form.value.description,
          nameTaskList: nameTaskList,
          board_id: this._boardId,
          order: order
        }

        this.tasksService.create$(task)
          .subscribe((task: ITask) => {
            this.form.reset();

            if (task.nameTaskList === 'To Do') {
              this.taskListToDo.push(task);
            }
            if (task.nameTaskList === 'In Progress') {
              this.taskListInProgress.push(task);
            }
            if (task.nameTaskList === 'Coded') {
              this.taskListCoded.push(task);
            }
            if (task.nameTaskList === 'Testing') {
              this.taskListTesting.push(task);
            }
            if (task.nameTaskList === 'Done') {
              this.taskListDone.push(task);
            }
          })
      } else {
        console.log('this field must not be empty');
      }
    }
  }
}
