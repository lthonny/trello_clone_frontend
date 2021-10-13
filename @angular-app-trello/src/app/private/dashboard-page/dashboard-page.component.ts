import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

import {switchMap} from "rxjs/operators";

import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";
import {BoardService} from "../../services/board.service";

import {ICreateTask, ITask} from "../../interfaces";

import {Board} from "../../models/board.model";
import {Column} from "../../models/column.model";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public _id!: number;
  public nameBoard: string = '';
  public nameUser: string | null = localStorage.getItem('name');

  public tasks: ITask[] = [];

  private taskListToDo: ITask[] = [];
  private taskListInProgress: ITask[] = [];
  private taskListCoded: ITask[] = [];
  private taskListTesting: ITask[] = [];
  private taskListDone: ITask[] = [];

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
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    console.log(this.board)
  }

  deleteTask(id: number, name: string) {
    this.tasksService.delete$(id)
      .subscribe(() => {
        if (name === 'TO DO') {
          this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
        }
        if (name === 'In Progress') {
          this.taskListInProgress = this.taskListInProgress.filter((task: any) => task.id !== id);
        }
        if (name === 'Coded') {
          this.taskListCoded = this.taskListCoded.filter((task: any) => task.id !== id);
        }
        if (name === 'Testing') {
          this.taskListTesting = this.taskListTesting.filter((task: any) => task.id !== id);
        }
        if (name === 'Done') {
          this.taskListDone = this.taskListDone.filter((task: any) => task.id !== id);
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

  ngOnInit() {
    this.route.params.subscribe(params => this._id = params['id']);

    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.tasksService.getById(params['id']);
      })).subscribe((tasks: any) => {
      this.tasks = tasks.tasks;
      this.nameBoard = tasks.title;

      this.tasks.forEach((task: ITask) => {
        if (task.nameTaskList === 'TO DO') {
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

      console.log('tasks', this.tasks);
    })
  }

  submit(nameTaskList: string) {
    const task: ICreateTask = {
      title: this.form.value.name,
      description: this.form.value.description,
      nameTaskList: nameTaskList,
      board_id: this._id
    }

    this.tasksService.create$(task).subscribe((task) => {
      this.form.reset();

      if (task.nameTaskList === 'TO DO') {
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
