import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

import {switchMap} from "rxjs/operators";

import {TaskService} from "../../services/task.service";
import {BoardService} from "../../services/board.service";

import {IArchive, ICreateTask, ITask} from "../../interfaces";

import {Board} from "../../models/board.model";
import {Column} from "../../models/column.model";

import { MatDialog } from "@angular/material/dialog";
import {TaskDescriptionComponent} from "./task-description/task-description.component";
import {ArchiveTasksService} from "../../services/archive.tasks.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public showFiller: boolean = false;

  public _id!: number;
  public nameBoard: string = '';
  public nameUser: any = localStorage.getItem('name');
  public nameTask: string = '';

  public tasks: ITask[] = [];

  private taskListToDo: ITask[] = [];
  private taskListInProgress: ITask[] = [];
  private taskListCoded: ITask[] = [];
  private taskListTesting: ITask[] = [];
  private taskListDone: ITask[] = [];

  public archivedTasks: any = [];

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
    private boardService: BoardService,
    private tasksService: TaskService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public archiveService: ArchiveTasksService
  ) {}

  openDialog(item: ITask): void {
    this.dialog.open(TaskDescriptionComponent, {
      data: {
        item,
        // tasks: []
      },
      height: '800px',
      width: '600px',
    });
  }

  drop(event: CdkDragDrop<string[]>, column: any) {
    const nameColumn = column.name;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // this.updatePositionDrops(this.tasks);
      // console.log('this.tasks', this.tasks);
      // this.tasks.forEach((task, index) => {
      //   console.log('update tasks');
      //   const idx = index + 1
      //   if (task.order !== index + 1) {
      //     task.order = idx;
      //     this.tasksService.updateOrder$(this.tasks)
      //       .subscribe((tasks) => {
      //         this.tasks = tasks;
              // console.log('updateOrder', tasks)
            // })
        // }
      // })
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
          this.tasksService.update$(task, nameColumn).subscribe(() => {})
        }
        return;
      })

      const ggArray: any  = []

      for (let i = 0; i < newTaskList.length; i++) {
        let gg = {
          id : newTaskList[i].id,
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

      //   if (orderSum) {
      //     order = orderSum + 1;
      //     // order = this.tasks.reduce((acc: any, curr: any) => {
      //     //     return acc > curr.order ? acc : curr.order;
      //     //   }, 1) + 1;
      //   }

      //   // task.order
      //   console.log(task)
      //   return task.order = ;
      // })

      ggArray.forEach( (task: any, index: number) => {
        console.log(task);
        // const idx = index + 1
        // if (task.position === idx && task.taskListId === this.taskList.id) {
        //   return
        // }
        // if (task.position !== idx) {
        //   task.position = idx
        // }
      });


    }

    console.log('this.tasks', this.tasks);
  }

  sortTasks(tasks: any) {
    tasks.sort( ( a: any, b: any) => {
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
    this.tasksService.delete$(id)
      .subscribe(() => {
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

  updateTitleBoard() {
    const titleBoard = document.querySelector('.title-board');

    if (titleBoard !== null) {
      const childNode = titleBoard.firstChild;

      if (childNode !== null) {
        titleBoard.removeChild(childNode);
        const input = document.createElement('input');
        input.value = this.nameBoard;
        titleBoard.append(input);

        input.focus();

        input.addEventListener('blur', (event: FocusEvent) => {
          titleBoard.innerHTML = input.value;
          this.nameBoard = input.value;

          this.boardService.updateBoard$(this._id, this.nameBoard)
            .subscribe((date: any) => this.nameBoard = date.title);
        });

        input.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.keyCode === 13) {
            titleBoard.innerHTML = input.value;
            this.nameBoard = input.value;

            this.boardService.updateBoard$(this._id, this.nameBoard)
              .subscribe((date: any) => this.nameBoard = date.title);
          }
        });
      }
    }
  }

  fullMenu() {
    this.archiveService.getArchive$(this._id).subscribe((tasks: any) => {
      this.archivedTasks.push(tasks.tasks);
      console.log('заархивированные задачи', this.archivedTasks);
    })
  }

  unzip(task: IArchive) {
    this.archiveService.setArchive$(task).subscribe(() => {
      // this.archivedTasks.filter((data: IArchive) => data.id === task.id)
      console.log('задача разархивированна', task);
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => this._id = params['id']);

    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.tasksService.getById(params['id']);
      })).subscribe((tasks: any) => {
      this.tasks = tasks.tasks;
      this.nameBoard = tasks.title;

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

      console.log('this.board', this.board);
    })

    // this.fetchAllArchive.getArchive$(this._id).subscribe(() => {});
  }

  submit(nameTaskList: string) {
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

    const task: ICreateTask = {
      title: this.form.value.name,
      description: this.form.value.description,
      nameTaskList: nameTaskList,
      board_id: this._id,
      order: order
    }

    this.tasksService.create$(task).subscribe((task: ITask) => {
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
  }
}

