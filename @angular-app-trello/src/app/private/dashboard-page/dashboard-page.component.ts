import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ICreateTask, ITask} from "../../interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  private _id: any = '';
  public nameBoard: string = '';

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
    public authService: AuthService
  ) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  createTask(name: string) {
    console.log(name)
    // this.tasksService.create$(name)
  }

  deleteTask(id: number) {
    this.tasksService.delete$(id)
      .subscribe(() => {
        console.log('задача удалена');
        // if (name === 'TO DO') {
        //   this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
        // }
        // if (name === 'In Progress') {
        //   this.taskListInProgress = this.taskListInProgress.filter((task: any) => task.id !== id);
        // }
        // if (name === 'Coded') {
        //   this.taskListCoded = this.taskListCoded.filter((task: any) => task.id !== id);
        // }
      })
  }

  updateTitleBoard() {
    this.modalTitle = true;
    console.log('dbClick');
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
