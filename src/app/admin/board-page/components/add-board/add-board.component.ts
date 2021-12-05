import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ICreateBoard {
  title: string
}

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent {
  constructor(
    public dialogRef: MatDialogRef<AddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICreateBoard
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
