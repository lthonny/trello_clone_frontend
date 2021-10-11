import { Component, OnInit } from '@angular/core';
import {IBoard} from "../../interfaces";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // boards: IBoard[] = [];

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    // this.boardService.getBoards$()
    //   .subscribe((board: IBoard[]) => {
    //     this.boards = board;
    //   })
  }

  removeBoard(id: number) {
    // this.boardService.removeBoard$(id).subscribe(() => {
    //   this.boards = this.boards.filter((board: IBoard) => board.id !== id);
    // });
  }

}
