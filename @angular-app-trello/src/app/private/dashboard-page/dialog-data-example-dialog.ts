import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";

export interface DialogData {
  item: {
    id: number,
    title: string,
    description: string,
    nameTaskList: string,
    board_id: number,
    createdAt: any,
    updatedAt: any,
    order: number
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['dialog-data-example-dialog.scss']
})
export class DialogDataExampleDialog implements OnInit {

  public title: string = '';
  public description: string = '';
  private archive: boolean = false;
  private _id: any;

  form: FormGroup = new FormGroup({
      description: new FormControl(null, [
          Validators.required
        ]
      )
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public taskService: TaskService
  ) {
    this.title = data.item.title;
    this.description = data.item.description;
    this._id = data.item.id;
  }

  ngOnInit(): void {
    new FormControl(this.form.value.description = this.description);
  }

  updateTitle() {
    const title = document.querySelector('.dialog-column-title');

    if (title !== null) {
      const childNode = title.firstChild;

      if (childNode !== null) {
        title.removeChild(childNode);
        const input = document.createElement('input');
        input.value = this.title;
        title.append(input);

        input.focus();

        input.addEventListener('blur', (event: FocusEvent) => {
          title.innerHTML = input.value;
          this.title = input.value;
        })
      }
    }
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
    console.log('archive');
  }

  submit() {
    const description = this.form.value.description;

    const descriptionUpdate: IDescriptionUpdate = {
      id: this._id,
      description: description
    }

    this.taskService.updateDescription(descriptionUpdate).subscribe(() => {
      console.log('ok');
    });
  }
}

export interface IDescriptionUpdate {
  id: number,
  description: string
}
