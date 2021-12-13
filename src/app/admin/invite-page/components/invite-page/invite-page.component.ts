import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiBoardService} from "../../../services/api.board.service";

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent implements OnInit {
  private _key: string = '';
  private _id: string = '';

  constructor(
    private route: ActivatedRoute,
    private boardService: ApiBoardService
  ) {
  }

  ngOnInit(): void {
    this.getInviteBoard();
  }

  public getInviteBoard() {
    this.route.params.subscribe(params => {
      this._key = params['key']
      this._id = params['id']
    });

    this.boardService.getInviteBoard$(this._key, this._id)
      .subscribe((board) => {
        localStorage.setItem('board_id', this._id);
        localStorage.setItem('key', this._key);
      })
  }
}
