import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {switchMap} from "rxjs/operators";
import {TaskService} from "../../services/task.service";
import {BoardService} from "../../services/board.service";
import {InviteService} from "../../services/invite.service";
import {ArchiveTasksService} from "../../services/archive.tasks.service";
import {
  DialogData,
  IAllArchiveTasks,
  IArchive,
  IBoard,
  ICreateTask,
  IInviteKey,
  IResAssigned,
  ITask,
  IUAssigned
} from "../../interfaces";
import {Board} from "../../models/board.model";
import {Column} from "../../models/column.model";
import {TaskDescriptionComponent} from "./task-description/task-description.component";
import {AuthService} from "../../services/auth.service";
import {AssignedService} from "../../services/assigned.service";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  private _userId: string | null = localStorage.getItem('id');
  public owner!: boolean;
  private _boardId!: number;
  public _boardName!: string;
  public _key!: string;
  public link!: string;
  public invite: boolean = true;
  public submitted: boolean = true;

  public searchTask: string = '';

  public invitedUsers: any = [];

  public tasks: ITask[] = [];
  private taskListToDo: ITask[] = [];
  private taskListInProgress: ITask[] = [];
  private taskListCoded: ITask[] = [];
  private taskListTesting: ITask[] = [];
  private taskListDone: ITask[] = [];

  public archivedTasks: any = [];


  public showFiller: boolean = false;

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
    public archiveService: ArchiveTasksService,
    private dialog: MatDialog,
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private tasksService: TaskService,
    public assignedService: AssignedService
  ) {
    this.route.params.subscribe(params => this._boardId = params['id']);
    this.boardService.getBoard$(this._boardId)
      .subscribe((board: IBoard) => this._boardName = board.title);
  }

  assigned(task: ITask) {
    console.log(task);
  }

  ngOnInit() {
    this.fetchAllTasks();
    this.getOwner();
    this.getInvitedUsers();
  }

  getInvitedUsers() {
    this.inviteService.InvitedUsers(this._boardId, this.authService.isUserId, this.authService.isNameUser)
      .subscribe(({names, owner}) => {
        names.forEach((data: any) => {
          this.invitedUsers.push({id: data.id, name: data.name, owner: data.owner});
        })
        // console.log('invited users', this.invitedUsers);
      })
  }

  getOwner() {
    this.inviteService.Owner$({
      userId: this.authService.isUserId,
      boardId: this._boardId
    }).subscribe(({userId, owner}) => {
      this.owner = owner;
      // console.log(this.owner);
    })
  }

  fetchAllTasks() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.tasksService.getTasks$(params['id']);
      }))
      .subscribe((tasks: any) => {
        if (!tasks.error) {
          this.tasks = tasks.tasks;
          this._boardName = tasks.title;

          console.log(this.tasks);

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
    // if (this.archiveService.archived === true) {
    //   this.allNameTaskList.forEach((name: string, i: number) => {
    //     // if (this.board.columns[i].name === name) {
    //     //   this.taskLists[i] = this.taskLists[i].filter((task: ITask) => task.id !== item.id);
    //     //   this.board.columns[i].tasks = this.taskLists[i].filter((task: ITask) => task.id !== item.id);
    //     // }
    //   })
    // }

    // console.log(item);

    if (this.owner) {
      const dialogRef = this.dialog.open(TaskDescriptionComponent, {
        data: {
          item,
          board: this._boardId,
          invited: this.invitedUsers
        },
        height: '800px',
        width: '600px',
      });

      dialogRef.afterClosed().subscribe((result: DialogData) => {
        if(result.item.nameTaskList === 'To Do') {
          const index = this.taskListToDo.findIndex((task) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListToDo.splice(index, 1);
            this.archiveService.archivedTasks[0].push(result.item);
          }
        }
        if(result.item.nameTaskList === 'In Progress') {
          const index = this.taskListInProgress.findIndex((task) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListInProgress.splice(index, 1);
            this.archiveService.archivedTasks[0].push(result.item);
          }
        }
        if(result.item.nameTaskList === 'Coded') {
          const index = this.taskListCoded.findIndex((task) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListCoded.splice(index, 1);
            this.archiveService.archivedTasks[0].push(result.item);
          }
        }
        if(result.item.nameTaskList === 'Testing') {
          const index = this.taskListTesting.findIndex((task) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListTesting.splice(index, 1);
            this.archiveService.archivedTasks[0].push(result.item);
          }
        }
        if(result.item.nameTaskList === 'Done') {
          const index = this.taskListDone.findIndex((task) => task.id === result.item.id);
          if (index !== -1) {
            this.taskListTesting.splice(index, 1);
            this.archiveService.archivedTasks[0].push(result.item);
          }
        }
        // result.forEach((resultUsers: any) => {
        //   console.log(resultUsers)
        // if(item.nameTaskList === 'Coded' && resultUsers.task_id === item.id) {
        //   // console.log('===');
        //
        //   this.taskListCoded.forEach((task: any) => {
        //     if(task.id === resultUsers.task_id) {
        //       console.log(task);
        //       this.taskListCoded = this.taskListCoded.filter((data: any) => {
        //         // console.log(data.id !== task.id)
        //         return data.id !== task.id;
        //       })
        //
        //       const newTask: any = {
        //         id: task.id,
        //         title: task.title,
        //         description: task.description,
        //         nameTaskList: task.nameTaskList,
        //         board_id: task.board_id,
        //         createdAt: task.createdAt,
        //         updatedAt: task.updatedAt,
        //         users: [{
        //           name: resultUsers.name
        //         }]
        //       }
        //
        //       this.taskListCoded.push(newTask);
        //       // console.log('this.taskListCoded', this.taskListCoded);
        //     }
        //   })
        // console.log(this.taskListCoded)
        // }
        // })
      });
    }
  }

  drop(event: CdkDragDrop<string[]>, column: any) {
    if (this.owner) {
      const nameColumn = column.name;

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.updatePositionDrops(this.tasks);
        this.tasks.forEach((task, index) => {
          const idx = index + 1
          if (task.order !== index + 1) {
            task.order = idx;
            this.tasksService.updateOrder$(this.tasks)
              .subscribe((tasks) => {
                this.tasks = tasks;
              })
          }
        })
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }

      if (event.container.data.length >= 0) {
        let newTaskList: any = [];

        event.container.data.forEach((task: any, index) => {
          newTaskList.push(task);

          if (task.nameTaskList !== nameColumn || task.order !== undefined) {
            this.tasksService.update$(task, nameColumn).subscribe(() => {
            })
          }
          return;
        })

        const ggArray: any = []

        for (let i = 0; i < newTaskList.length; i++) {
          let gg = {
            id: newTaskList[i].id,
            title: newTaskList[i].title,
            description: newTaskList[i].description,
            nameTaskList: newTaskList[i].nameTaskList,
            createdAt: newTaskList[i].createdAt,
            updatedAt: newTaskList[i].updatedAt,
            order: i
          }
          ggArray.push(gg);
        }
      }
    }
  }

  sortTasks(tasks: ITask[]) {
    tasks.sort((a: any, b: any) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    })
  }

  updatePositionDrops(tasks: ITask[]) {
    this.tasksService.updateOrder$(tasks)
      .subscribe((tasks: { id: string, tasks: ITask[] }) => console.log('response order', tasks));
  }

  updateTitleBoard() {
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
            this._boardName,
            this._userId
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
              this._boardName,
              localStorage.getItem('id'))
              .subscribe(({id, title, owner}) => {
                if (title !== this._boardName) {
                  this.owner = owner;
                  this._boardName = title;
                  console.log('owner->', this.owner);
                } else {
                  this.owner = owner;
                  console.log('owner->', this.owner);
                }
              });
          }
        });
      }
    }
  }

  fullMenu() {
    this.archiveService.getArchive$(this._boardId)
      .subscribe((data: IAllArchiveTasks) => {
        this.archivedTasks.push(data.tasks);
      })
  }

  unzip(task: IArchive) {
    this.archiveService.setArchive$(task)
      .subscribe(() => {
        for (let i = 0; i < this.board.columns.length; i++) {
          if (this.board.columns[i].name === task.nameTaskList) {
            this.board.columns[i].tasks.push(task);
          }
        }
        this.archiveService.archivedTasks[0] = this.archiveService.archivedTasks[0].filter((data: IArchive) => data.id !== task.id);
      })
  }

  inviteKey() {
    this.invite = false;

    this.inviteService.InviteKey$(this._boardId)
      .subscribe((key: IInviteKey) => {
        this._key = key.key;
        const link = `http://localhost:4200/admin/invite/${this._boardId}/${key.key}`;
        this.link = link;
        this.inviteService.InviteUsers$(this._key)
          .subscribe((data: any) => console.log('data', data));
        console.log('invite key', link);
      })
  }

  onClose() {
    this.submitted = true;
    this.form.reset();
  }

  removeTask(id: number, name: string) {
    if (this.owner) {
      this.tasksService.delete$(id)
        .subscribe(() => {
          this.allNameTaskList.forEach((taskName: string, i: number) => {
            if (taskName === name) {
              this.taskLists[i] = this.taskLists[i].filter((task: ITask) => task.id !== id);
              this.board.columns[i].tasks = this.taskLists[i].filter((task: ITask) => task.id !== id);
            }
          })
        })
    }
  }

  removeAllTasks(columnName: string) {
    if (columnName) {
      this.tasksService.tasksAllDelete$(
        this._boardId,
        columnName
      ).subscribe((data: { ok: string }) => {
        this.allNameTaskList.forEach((allNameTaskList: string, i: number) => {
          if (columnName === allNameTaskList && data.ok) {
            this.taskLists[i].length = 0;
          }
        })
      })
    }
  }

  submit(nameTaskList: string) {
    if (this.owner) {
      let order: number = 1;
      let orderSum =
        this.taskListToDo.length +
        this.taskListCoded.length +
        this.taskListInProgress.length +
        this.taskListTesting.length +
        this.taskListDone.length;

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

            // let taskLists = ['To Do', 'In Progress', 'Coded', 'Testing', 'Done'];
            //
            // taskLists.forEach((taskList) => {
            //   if(taskList === task.nameTaskList) {
            //     this.taskListToDo.push(task);
            //   }
            // })

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
        console.log('данное поле не должно быть пустым');
      }
    }
  }
}
