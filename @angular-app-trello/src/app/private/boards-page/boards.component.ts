import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {BoardService} from "../../services/board.service";

import {IBoard} from "../../interfaces";


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: IBoard[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
    public boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards$()
      .subscribe((board: IBoard[]) => {
        this.boards = board;
      })
  }

  removeBoard(id: number) {
    this.boardService.removeBoard$(id).subscribe(() => {
      this.boards = this.boards.filter((board: IBoard) => board.id !== id);
    });
  }

  submit() {
    this.boardService.createBoard$(this.form.value.name)
      .subscribe((board: IBoard) => {
        this.form.reset();
        this.boards.push(board);
      })
  }
}
