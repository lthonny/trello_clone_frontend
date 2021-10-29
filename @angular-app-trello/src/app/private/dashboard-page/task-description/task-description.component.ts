import {Component, Inject, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

import {MAT_DIALOG_DATA} from "@angular/material/dialog";

import {TaskService} from "../../../services/task.service";
import {ArchiveTasksService} from "../../../services/archive.tasks.service";

import {DialogData, IArchive, IAssignedUser, IDescriptionUpdate, ITask} from "../../../interfaces";
import {AssignedService} from "../../../services/assigned.service";

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss']
})
export class TaskDescriptionComponent implements OnInit {

  private readonly _id: number;
  public title: string = '';
  public description!: FormControl;

  public users: any = [];
  public assignedUsers: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public taskService: TaskService,
    public archiveService: ArchiveTasksService,
    private assignedService: AssignedService
  ) {
    this._id = data.item.id;
    this.title = data.item.title;
    this.description = new FormControl(this.data.item.description);
  }

  ngOnInit(): void {
    this.assignedService.fetch$(this._id)
      .subscribe((data: any) => {
        data.forEach((user: any) => {
          // console.log('data.forEach', user);
          if(user.assigned === true) {
            this.assignedUsers.push(user);
          } else {
            this.users.push(user);
          }
        })
        console.log('assigned users', data);
      })

    this.data.invited.forEach((user: any) => {
      if(user.assigned === true) {
        this.assignedUsers.push(user);
      } else {
        this.users.push(user);
      }
    })
  }

  updateTitle() {
    // title task
  }

  showDetails() {
    console.log('showDetails');
  }

  archiveState() {
    const task: IArchive = this.data.item;
    this.archiveService.setArchive$(task).subscribe(() => {
      // console.log('задача зархивированна');
      console.log('data', this.data);
      // this.dashboard.archivedTasks.filter((data: IArchive) => data.id !== task.id);
      // this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
      // this.taskListToDo = this.taskListToDo.filter((task: any) => task.id !== id);
    })
  }

  assigned(user: any) {
    this.assignedService.add$(this._id, user.id)
      .subscribe((data) => {
        if (data.error) {
          this.users = this.users.filter((user: any) => user.id !== user.id);
          console.log('dd')
        } else {
          // console.log('пользователь добавлен', data, user.id);

          // this.assignedUsers = this.assignedUsers.filter((user: any) => user.id !== data.id);

          // const index = this.assignedUsers.indexOf(this.assignedUsers.length);
          // if (index > -1) {
          // this.assignedUsers.forEach((user: any, index: number) => {
          //   this.assignedUsers.splice(index, 1);
          // })
          // }

          // const index = this.assignedUsers.findIndex((element: any) => element.id === user.id);
          // if (index === -1) {
          // this.assignedUsers.forEach((user: any, index: number) => {
          //   this.assignedUsers.splice(index, 1);
          //   this.assignedUsers = this.assignedUsers.filter((user: any) => user.id !== data.id);
          // })
          //   this.assignedUsers = this.assignedUsers.filter((user: any))
          // }

          // console.log(index)

          // this.assignedUsers.push(data);

          // this.assignedUsers = this.assignedUsers.filter((user: any) => {
          //   console.log(user)
          //   // if (user.assigned !== data.assigned) {
          //   //   console.log('user gg')
          //   //   return user;
          //   // } else {
          //   //   this.users.push(user);
          //   // }
          // });

          if(data.assigned === true) {
            this.assignedUsers.push(user);
            // return this.assignedUsers = this.assignedUsers.filter((user: any) => user.assigned !== data.assigned);
          } else {
            this.users.push(user);
          }

        }
        console.log('add', data)
      })
  }

  updateAssigned(user: any) {
    // this.assignedUsers = this.assignedUsers.filter((user: any) => {
    //   if (user.id !== id) {
    //     return user;
    //   } else {
    //     this.users.push(user);
    //   }
    // });

    this.assignedService.update$(this._id, user.id, user.assigned)
      .subscribe((data): any => {
        console.log('update data', data);
        // console.log('assignedService.remove ->', data.message);
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

