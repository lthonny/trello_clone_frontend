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
import {IArchive, ICreateTask, IInviteKey, ITask} from "../../interfaces";
import {Board} from "../../models/board.model";
import {Column} from "../../models/column.model";
import {TaskDescriptionComponent} from "./task-description/task-description.component";
import {AuthService} from "../../services/auth.service";

export interface IColumn {
  name: string,
  tasks: [{
      id: number,
      title: string,
      description: string,
      nameTaskList: string,
      order: number,
      archive: boolean,
      board_id: number,
      createdAt: any,
      updatedAt: any
    }]
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public popoverColumnInfo: boolean = false;
  public submitted: boolean = true;
  public invite: boolean = true;
  public link: string = '';

  public _boardId!: number;
  public _boardName: string = '';

  public tasks: ITask[] = [];
  private taskListToDo: ITask[] = [];
  private taskListInProgress: ITask[] = [];
  private taskListCoded: ITask[] = [];
  private taskListTesting: ITask[] = [];
  private taskListDone: ITask[] = [];

  // public archivedTasks: any = [];
  public _key: any;

  public invitedUsers: any = [];
  public owner!: boolean;

  public showFiller: boolean = false;

  board: Board = new Board('tasks', [
    new Column('To Do', this.taskListToDo),
    new Column('In Progress', this.taskListInProgress),
    new Column('Coded', this.taskListCoded),
    new Column('Testing', this.taskListTesting),
    new Column('Done', this.taskListDone)
  ]);

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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private tasksService: TaskService,
    public archiveService: ArchiveTasksService,
    private inviteService: InviteService
  ) {
    this.route.params.subscribe(params => this._boardId = params['id']);
    this.boardService.getBoard$(this._boardId)
      .subscribe((board: any) => this._boardName = board.title);
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.tasksService.getTasks$(params['id']);
      }))
      .subscribe((tasks: any) => {
        if (!tasks.error) {
          this.tasks = tasks.tasks;
          this._boardName = tasks.title;

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

    this.inviteService.Owner$({
      userId: this.authService.isUserId,
      boardId: this._boardId
    }).subscribe(({userId, owner}) => {
      this.owner = owner;
      console.log(this.owner);
    })

    this.inviteService.InvitedUsers(this._boardId, this.authService.isUserId, this.authService.isNameUser)
      .subscribe(({names, owner}) => {
        names.forEach((data: any) => {
          this.invitedUsers.push({id: data.id, name: data.name, owner: data.owner});
        })
        console.log('invited users', this.invitedUsers);
      })
  }

  openDialog(item: ITask): void {
    console.log('item', item.nameTaskList);

    if(this.archiveService.archived === true) {
      console.log('true')
      // if (this.board.columns[0].name === 'To Do') {
      //   this.taskListToDo = this.taskListToDo.filter((task: ITask) => task.id !== item.id);
      //   this.board.columns[0].tasks = this.taskListToDo.filter((task: ITask) => task.id !== item.id);
      // }
      // if (this.board.columns[1].name === 'In Progress') {
      //   this.taskListInProgress = this.taskListInProgress.filter((task: ITask) => task.id !== item.id);
      //   this.board.columns[1].tasks = this.taskListInProgress.filter((task: ITask) => task.id !== item.id);
      // }
      // if (this.board.columns[2].name === 'Coded') {
      //   this.taskListCoded = this.taskListCoded.filter((task: ITask) => task.id !== item.id);
      //   this.board.columns[2].tasks = this.taskListCoded.filter((task: ITask) => task.id !== item.id);
      // }
      // if (this.board.columns[3].name === 'Testing') {
      //   this.taskListTesting = this.taskListTesting.filter((task: ITask) => task.id !== item.id);
      //   this.board.columns[3].tasks = this.taskListTesting.filter((task: ITask) => task.id !== item.id);
      // }
      // if (this.board.columns[4].name === 'Done') {
      //   this.taskListDone = this.taskListDone.filter((task: ITask) => task.id !== item.id);
      //   this.board.columns[4].tasks = this.taskListDone.filter((task: ITask) => task.id !== item.id);
      // }
    }

    if (this.owner) {
      this.dialog.open(TaskDescriptionComponent, {
        data: {item, board: this._boardId, invited: this.invitedUsers},
        height: '800px',
        width: '600px',
      });
    }
  }

  drop(event: CdkDragDrop<string[]>, column: any) {
    if (this.owner) {
      const nameColumn = column.name;

      console.log('column', column);

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.updatePositionDrops(this.tasks);
        console.log('this.tasks', this.tasks);
        this.tasks.forEach((task, index) => {
          console.log('update tasks');
          const idx = index + 1
          if (task.order !== index + 1) {
            task.order = idx;
            this.tasksService.updateOrder$(this.tasks)
              .subscribe((tasks) => {
                this.tasks = tasks;
                console.log('updateOrder', tasks)
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
            console.log('asd')
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

        // //
        console.log('ggArray', ggArray);

        // if (orderSum) {
        //   order = orderSum + 1;
        //   // order = this.tasks.reduce((acc: any, curr: any) => {
        //   //     return acc > curr.order ? acc : curr.order;
        //   //   }, 1) + 1;
        // }

        //   // task.order
        //   console.log(task)
        //   return task.order = ;
        // })

        // ggArray.forEach((task: any, index: number) => {
        //   console.log(task);
        //   const idx = index + 1
        //   if (task.position === idx && task.taskListId === this.taskList.id) {
        //     return
        //   }
        //   if (task.position !== idx) {
        //     task.position = idx
        //   }
        // });
      }
      console.log('this.tasks', this.tasks);
    }
  }

  sortTasks(tasks: any) {
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

  updatePositionDrops(tasks: any) {
    return this.tasksService.updateOrder$(tasks)
      .subscribe((tasks: any) => console.log(tasks));
  }

  deleteTask(id: number, name: string) {
    if (this.owner) {
      this.tasksService.delete$(id)
        .subscribe(() => {
          // for (let i = 0; i < this.board.columns.length; i++) {
          //   if (this.board.columns[i].name === name) {
          //     this.taskListToDo = this.taskListToDo.filter((task: ITask) => task.id !== id);
          //     this.board.columns[i].tasks = this.taskListToDo.filter((task: ITask) => task.id !== id);
          //   }
          // }
          if (this.board.columns[0].name === name) {
            this.taskListToDo = this.taskListToDo.filter((task: ITask) => task.id !== id);
            this.board.columns[0].tasks = this.taskListToDo.filter((task: ITask) => task.id !== id);
          }
          if (this.board.columns[1].name === name) {
            this.taskListInProgress = this.taskListInProgress.filter((task: ITask) => task.id !== id);
            this.board.columns[1].tasks = this.taskListInProgress.filter((task: ITask) => task.id !== id);
          }
          if (this.board.columns[2].name === name) {
            this.taskListCoded = this.taskListCoded.filter((task: ITask) => task.id !== id);
            this.board.columns[2].tasks = this.taskListCoded.filter((task: ITask) => task.id !== id);
          }
          if (this.board.columns[3].name === name) {
            this.taskListTesting = this.taskListTesting.filter((task: ITask) => task.id !== id);
            this.board.columns[3].tasks = this.taskListTesting.filter((task: ITask) => task.id !== id);
          }
          if (this.board.columns[4].name === name) {
            this.taskListDone = this.taskListDone.filter((task: ITask) => task.id !== id);
            this.board.columns[4].tasks = this.taskListDone.filter((task: ITask) => task.id !== id);
          }
        })
    }
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

        input.addEventListener('blur', (event: FocusEvent) => {
          titleBoard.innerHTML = input.value;
          this._boardName = input.value;

          this.boardService.updateBoard$(
            this._boardId,
            this._boardName,
            localStorage.getItem('id'))
            .subscribe(({id, title, owner}) => {
              // if (title !== this._boardName) {
              this.owner = owner;
              this._boardName = title;
              // console.log('owner->', this.owner);
              // } else {
              //   this.owner = owner;
              //   console.log('owner->', this.owner);
              // }
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
      .subscribe((tasks: any) => {
        // this.archivedTasks.push(tasks.tasks);
        this.archiveService.archivedTasks.push(tasks.tasks);
      })
  }

  unzip(task: IArchive) {
    this.archiveService.setArchive$(task)
      .subscribe(() => {
        for(let i = 0; i < this.board.columns.length; i++) {
          if(this.board.columns[i].name === task.nameTaskList) {
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
    // this.inviteService.InviteUsers$(this._key)
    //   .subscribe((data: any) => {
    //     console.log(this._key);
    //   })
  }

  onClose() {
    this.submitted = true
    this.form.reset()
  }

  popoverColumn(column: any) {
    console.log(column.name);
    if(column.name !== undefined) {
      this.tasksService.tasksAllDelete$(this._boardId, column.name)
        .subscribe((data: any) => {
          console.log('data', data);
          if(column.name === 'In Progress' && data.ok) {
            this.taskListInProgress.length = 0;
          }
        })
    } else {
      console.log('Колонка пуста');
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
      if(
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
