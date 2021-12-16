import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiBoardService} from "../../../services/api.board.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent implements OnInit {
  // private _key: string = '';
  // private _id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: ApiBoardService,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    // this.getInviteBoard();

    if(this.auth.isAuthorized) {
      this.router.navigate(['/admin', 'boards']);
    }
  }

  public getInviteBoard() {
    // this.route.params.subscribe(params => {
    //   this._key = params['key']
    //   this._id = params['id']
    // });
    //
    //
    // localStorage.setItem('board_id', this._id);
    // localStorage.setItem('key', this._key);

    // this.boardService.getInviteBoard$(this._key, this._id)
    //   .subscribe((board) => {
    //   })
  }
}
