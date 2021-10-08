import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.boardService.getBoards$().subscribe((board: IBoard[]) => {
      this.boards = board;
    })
  }

  taskList() {
    console.log('tasklist');
  }

  update(id: any) {

    // this.boardService.updateBoard(id, name).subscribe(() => {});
  }

  deleteBoard(id: number) {
    this.boardService.deleteBoard$(id).subscribe(() => {
      this.boards = this.boards.filter((board: any) => board.id !== id);
    });
  }
  submit() {
    const board: string = this.form.value.name;
    this.boardService.createBoard$(board).subscribe((board: any)=> {
      this.form.reset();
      this.boards.push(board);
    })
  }
}
