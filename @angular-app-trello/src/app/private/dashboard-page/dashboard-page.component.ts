import {Component, Inject, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ICreateTask, ITask} from "../../interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {BoardService} from "../../services/board.service";

import {Board} from "./board.model";
import {Column} from "./column.model";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('Research', [
      "Lorem ipsum",
      "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Todo', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Done', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);

  private _id: any = '';
  public nameBoard: string = '';
  public idBoard: any = '';

  public taskListToDo: ITask[] = [];
  public taskListInProgress: any = [];
  public taskListCoded: any = [];
  // public taskListTesting: [] = [];
  // public taskListDone: [] = [];

  public tasks: ITask[] = [];

  public modalTitle: boolean = false;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
    description: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
    private tasksService: TaskService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private boardService: BoardService
  ) {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  createTask(name: string) {
    console.log(name)
    // this.tasksService.create$(name)
  }

  deleteTask(id: number, name: string) {
    this.tasksService.delete$(id)
      .subscribe(() => {
        // console.log('задача удалена');
        if (name === 'TO DO') {
          this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
        }
        if (name === 'In Progress') {
          this.taskListInProgress = this.taskListInProgress.filter((task: any) => task.id !== id);
        }
        if (name === 'Coded') {
          this.taskListCoded = this.taskListCoded.filter((task: any) => task.id !== id);
        }
      })
  }

  updateTitleBoard(id: number) {
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

          this.boardService.updateBoard$(this.idBoard, this.nameBoard)
            .subscribe((date: any) => this.nameBoard = date.title);
        });

        input.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.keyCode === 13) {
            titleBoard.innerHTML = input.value;
            this.nameBoard = input.value;

            this.boardService.updateBoard$(this.idBoard, this.nameBoard)
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
      this.idBoard = tasks.id;

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
      })

      console.log('tasks', this.tasks);
    })
  }

  submit(name: string) {
    const task: ICreateTask = {
      title: this.form.value.name,
      description: this.form.value.description,
      nameTaskList: name,
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

      console.log(task);
    })
  }
}
