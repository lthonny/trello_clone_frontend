import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {TaskService} from "../../../services/task.service";
import {ArchiveTasksService} from "../../../services/archive.tasks.service";

import {DialogData, IArchive, IDescriptionUpdate} from "../../../interfaces";

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss']
})
export class TaskDescriptionComponent implements OnInit {

  private readonly _id: number;
  public title: string = '';
  public description!: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public taskService: TaskService,
    public archiveService: ArchiveTasksService,
  ) {
    this._id = data.item.id;
    this.title = data.item.title;
    this.description = new FormControl(this.data.item.description);
  }

  ngOnInit(): void {
  }

  updateTitle() {
  }

  updateDescription() {
    // if(description !== null) {
    //   const childNode = description.firstChild;
    //
    //   if(childNode !== null) {
    //     description.removeChild(childNode);
    //     const input = document.createElement('textarea');
    //     input.value = this.description;
    //     description.append(input);
    //
    //     input.focus();
    //
    //     input.addEventListener('blur', (event: FocusEvent) => {
    //       description.innerHTML = input.value;
    //       this.description = input.value;
    //     })
    //   }
    // }
  }

  showDetails() {
    console.log('showDetails');
  }

  archiveState() {
    const task: IArchive = this.data.item;
    this.archiveService.setArchive$(task).subscribe(() => {
      // console.log('задача зархивированна');

    console.log('data', this.data)
      // this.dashboard.archivedTasks.filter((data: IArchive) => data.id !== task.id);
      // this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
      // this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
    })
  }

  submit() {
    const descriptionUpdate: IDescriptionUpdate = {
      id: this._id,
      description: this.description.value
    }

    this.taskService.updateDescription(descriptionUpdate).subscribe((task) => {
      this.data.item.description = task.description;
    });
  }
}

