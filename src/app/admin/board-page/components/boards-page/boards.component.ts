import {Component, OnInit} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {IBoard} from "../../../../interfaces";
import {ApiBoardService} from "../../../services/api.board.service";
import {AddBoardComponent} from "../add-board/add-board.component";
import {AuthService} from "../../../auth/services/auth.service";

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
    private apiBoardService: ApiBoardService
  ) {
  }

  ngOnInit(): void {
    this.getBoards();
    this.getInviteBoard();
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
    if (this.inviteKey) {
      this.apiBoardService.getInviteBoard$(this.inviteKey, this.boardId)
        .subscribe((board: any) => {
          this.boards.push(board.board);
        });
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
        if (result) {
          this.boardName = result;
          this.submit();
        }
      });
  }

  public deleteBoard(board_id: number): void {
    if(confirm("Are you sure to delete? ")) {
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

