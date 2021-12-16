import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Route, ActivatedRoute
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../auth.service";
import {ApiBoardService} from "../../../services/api.board.service";

@Injectable({
  providedIn: 'root'
})
export class InviteResolver implements Resolve<boolean> {
  private readonly inviteKey: string | null = localStorage.getItem('key');
  private readonly boardId: string | null = localStorage.getItem('board_id');

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private boardService: ApiBoardService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    localStorage.setItem('key', route.params['key']);
    localStorage.setItem('board_id', route.params['id']);

    if (!this.auth.isAuthorized) {
      console.log('!this.auth.isAuthorized');
      this.router.navigate(['/admin', 'login']);
    }

    if (this.auth.isAuthorized) {
      console.log('this.auth.isAuthorized');
        this.boardService.getInviteBoard$(this.inviteKey, this.boardId)
          .subscribe((board) => {
            this.router.navigate(['/admin', 'boards']);
          })
    }
  }
}
