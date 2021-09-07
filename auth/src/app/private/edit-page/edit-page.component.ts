import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {TasksService} from "../../services/tasks.service";
import {switchMap} from "rxjs/operators";
import {ITask} from "../../interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  task!: ITask;
  form!: FormGroup;
  submitted: boolean = false;
  updateSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.tasksService.fetchOne(params['id']);
      })
    )
      .subscribe((task: ITask) => {
        this.task = task;
        this.form = new FormGroup({
          title: new FormControl(task.title, Validators.required),
          text: new FormControl(task.text, Validators.required)
        })
      })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    //  this.updateSub = this.tasksService.update(2, {
    //   ...this.task,
    //    title: this.form.value.title,
    //    text: this.form.value.text
    // })
    //   .subscribe(() => {
    //     this.submitted = false;
    //   })
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
