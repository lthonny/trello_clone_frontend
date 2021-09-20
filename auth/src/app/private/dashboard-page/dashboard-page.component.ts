import { Component, OnInit } from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {ITask, IUpdateTask} from "../../interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  tasks: any = [];
  searchTasks: string = '';
  filterStatus: string = 'all';
  complete: boolean = false;

  constructor(
    public tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.tasksService.fetchAll$().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  filter(filtered: string) {
    this.filterStatus = filtered;
  }

  remove(id: string) {
    this.tasksService.remove$(id).subscribe(() => {
      this.tasks = this.tasks.filter((task: any) => task.id !== id);
      // this.alertService.danger('Task has been deleted');
    })
  }

  completed(task: any) {
    task.status = !task.status;
    this.tasksService.update$(task.id, task).subscribe(()=>{});
  }
}
