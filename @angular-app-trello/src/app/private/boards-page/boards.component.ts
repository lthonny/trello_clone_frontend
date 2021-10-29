import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {BoardService} from "../../services/board.service";

import {IBoard} from "../../interfaces";
import {InviteService} from "../../services/invite.service";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  private readonly _id: string | null = localStorage.getItem('id');
  boards: IBoard[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ])
  });

  constructor(
    private boardService: BoardService,
    private inviteService: InviteService
  ) {}

  ngOnInit(): void {
    this.boardService.getBoards$()
      .subscribe((board: IBoard[]) => {
        this.boards = board;
      })

    this.inviteService.InviteBoard$(this._id, this.inviteService._key)
      .subscribe((board: IBoard) => {
        this.boards.push(board);
      })
  }

  removeBoard(id: number) {
    this.boardService.removeBoard$(id).subscribe(() => {
      this.boards = this.boards.filter((board: IBoard) => board.id !== id);
    });
  }

  submit() {
    if(this.form.value.name === null) {
      console.log('поле не должно быть пустым!');
    }
    else {
      this.boardService.createBoard$(this.form.value.name)
        .subscribe((board: IBoard) => {
          this.form.reset();
          this.boards.push(board);
        })
    }
  }
}
