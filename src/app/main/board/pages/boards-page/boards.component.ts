import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BoardService} from "../../services/board.service";
import {IBoard} from "../../../../interfaces";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  private readonly inviteKey: string | null = localStorage.getItem('key');
  private readonly boardId: string | null = localStorage.getItem('board_id');

  public boardName: string = '';
  public boards: IBoard[] = [];

  constructor(
    private dialog: MatDialog,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards$()
      .subscribe((board: IBoard[]) => {
        if (board.length !== 0) {
          this.boards = board;
        }
      });

    if(this.inviteKey) {
      this.boardService.getInviteBoard$(this.inviteKey, this.boardId)
        .subscribe((board: IBoard) => {});
      localStorage.removeItem('board_id');
      localStorage.removeItem('key');
    }
  }

  public addBoardDialog(): void {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      height: '200px',
      width: '300px',
      data: {
        title: this.boardName = ''
      },
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        this.boardName = result;
        this.submit();
      });
  }

  public remove(board_id: number): void {
    this.boardService.deleteBoard$(board_id).subscribe(() => {
      this.boards = this.boards.filter((board: IBoard) => board.id !== board_id);
    });
  }

  public submit(): void {
    if (!this.boardName.trim()) {
      return;
    }
    this.boardService.createBoard$(this.boardName)
      .subscribe((board: IBoard) => {
        this.boards.push(board);
      })
  }
}

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./boards.component.scss']
})
export class AddBoardComponent {
  constructor(
    public dialogRef: MatDialogRef<AddBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
