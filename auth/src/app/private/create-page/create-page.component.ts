import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces';
import {TasksService} from "../../services/tasks.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  searchPosts: string = '';

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
    ]),
    text: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    public tasksService: TasksService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const task: ITask = {
      title: this.form.value.title,
      text: this.form.value.text,
      status: false
    }

    this.tasksService.create(task)
      .subscribe(() => this.form.reset());
  }

}
