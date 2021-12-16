import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IBoard} from "../../../../interfaces";
import {ApiBoardService} from "../../../services/api.board.service";
import {AddBoardComponent} from "../add-board/add-board.component";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  public boardName: string = '';
  public boards: IBoard[] = [];

  constructor(
    private dialog: MatDialog,
    private apiBoardService: ApiBoardService
  ) {
  }

  ngOnInit(): void {
    this.getInviteBoard();
    this.getBoards();
  }

  public getBoards(): void {
    this.apiBoardService.getBoards$()
      .subscribe((board: IBoard[]) => {
        if (board.length !== 0) {
          this.boards = board;
        }
      });
  }

  public getInviteBoard(): void {
    const key: string | null = localStorage.getItem('key');
    const boardId: string | null = localStorage.getItem('board_id');

    if (key) {
      this.apiBoardService.getInviteBoard$(key, boardId)
        .subscribe((data: any) => {
          localStorage.removeItem('key')
          localStorage.removeItem('board_id')
        });
      this.getBoards();
    }
  }

  public addBoardDialog(): void {
    const dialogRef = this.dialog.open(AddBoardComponent, {
      height: '200px',
      width: '300px',
      data: {title: this.boardName = ''},
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.boardName = result;
          this.submit();
        }
      });
  }

  public deleteBoard(board_id: number): void {
    if (confirm("Are you sure to delete? ")) {
      this.apiBoardService.deleteBoard$(board_id).subscribe(() => {
        this.boards = this.boards.filter((board: IBoard) => board.id !== board_id);
      });
    }
  }

  public submit(): void {
    if (!this.boardName.trim()) {
      return;
    }
    this.apiBoardService.createBoard$(this.boardName)
      .subscribe((board: IBoard) => {
        this.boards.push(board);
      })
  }
}

