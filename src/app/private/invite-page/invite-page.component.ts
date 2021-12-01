import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InviteService} from "../../services/invite.service";

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})
export class InvitePageComponent implements OnInit {
  private _key: string = '';

  constructor(
    private inviteService: InviteService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this._key = params['key']);
    this.inviteService.inviteBoard$(this._key)
      .subscribe((board) => {
        localStorage.setItem('key', this._key);
      })
  }
}
