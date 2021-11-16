import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BoardService} from "../../services/board.service";
import {InviteService} from "../../services/invite.service";
import {IBoard} from "../../interfaces";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: IBoard[] = [];
  boardName: string = '';

  private loggedIn!: boolean;

  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    public inviteService: InviteService,
    private cookies: CookieService
  ) {
    // console.log('cookies id', this.cookies.get('id'));
    // console.log('cookies name', this.cookies.get('name'));
    // localStorage.setItem('id', this.cookies.get('id'));
    // localStorage.setItem('name', this.cookies.get('name'));
  }

  ngOnInit() {
    this.boardService.getBoards$()
      .subscribe((board: IBoard[]) => {
        if(board.length !== 0) {
          this.boards = board;
        }
      });
    // console.log('board', this.boardService.isIdBoard, this.inviteService._key);
    this.inviteService.InviteBoard$(this.boardService.isIdBoard, this.boardService.isKeyBoard)
      .subscribe((board:  any) => {
        if(board !== 'Key not found') {
          this.boards.push(board);
        }
      });
  }

  addBoardDialog() {
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

  remove(id: number) {
    this.boardService.removeBoard$(id)
      .subscribe(() => {
        this.boards = this.boards.filter((board: IBoard) => board.id !== id);
      });
  }

  submit() {
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

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
