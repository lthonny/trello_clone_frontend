import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {InviteService} from "../../services/invite.service";
import {AuthService} from "../../services/auth.service";
import {IBoard} from "../../interfaces";

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent implements OnInit {

  private readonly _userId: string | null = localStorage.getItem('id');
  public readonly _userName: string | null = localStorage.getItem('name');

  private _key: string = '';
  public _boardId!: number;
  public boardName: string = '';

  constructor(
    private inviteService: InviteService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this._key = params['key']);
    this.inviteService.inviteBoard$(this._userId, this._key)
      .subscribe((data: IBoard) => {
        this.boardName = data.title;
        this._boardId = data.id;

        this.inviteService._key = this._key;
        this.router.navigate(['/admin', `boards-page`, this._boardId])
      })
  }

  joinBoard(): void {

    // this.inviteService.InviteBoard$(this._userId, this._key)
    //   .subscribe((board: IBoard) => {
    //     this.boardName = board.title;
    //     this._boardId = board.id;
    //     this.inviteService._key = this._key;
    //     this.router.navigate(['/admin', `boards-page`, this._boardId])
    //   })
  }
}
