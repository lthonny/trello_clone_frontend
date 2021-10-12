import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITask} from "../../interfaces";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  private _id: any = '';

  public titleColumn = [
    {title: 'To Do'},
    {title: 'In Progress'},
    {title: 'Coded'},
    {title: 'Testing'},
    {title: 'Done'}
  ]

  public tasks = [
    {title: 1},
    {title: 2},
    {title: 3},
    {title: 4},
  ]

  public taskListToDo: ITask[] = [];
  public taskListInProgress: ITask[] = [];
  public taskListCoded: ITask[] = [];
  public taskListTesting: ITask[] = [];
  public taskListDone: ITask[] = [];

  // public tasks: [] = [];

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
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this._id = params['id']);

    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.tasksService.getById(params['id']);
      })).subscribe((tasks: any) => {
      this.tasks = tasks.tasks;
      // this.nameBoard = tasks.title;
      // this.idBoard = tasks.id;

      this.tasks.forEach((task: any) => {
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  deleteTask() {}

  submit(name: string) {}
}
