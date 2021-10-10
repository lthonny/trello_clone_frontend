import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../services/board.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ITask} from "../../interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public pillars: any = [
    {name: "To Do", task: "1"},
    {name: "In Progress", task: "2"},
    {name: "Coded", task: "3"},
    {name: "Testing", task: "4"},
    {name: "Done", task: "5"},
  ]

  constructor(
    private tasksService: TaskService
  ) {}

  ngOnInit() {
    this.tasksService.getTasks$().subscribe((task: ITask[]) => {
      console.log(task);
    })
  }
}
