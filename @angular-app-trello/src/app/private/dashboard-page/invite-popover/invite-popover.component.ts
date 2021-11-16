import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import {InviteService} from "../../../services/invite.service";

@Component({
  selector: 'app-invite-popover',
  templateUrl: './invite-popover.component.html',
  styleUrls: ['./invite-popover.component.scss']
})
export class InvitePopoverComponent implements OnInit {
  @Input()
  boardId: any;
  isActive = false
  invite: string = ''
  isCreated = false

  constructor(
    private elementRef: ElementRef,
    // private inviteService: InviteService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event.path'])
  onClick(path: Array<any>) {
    const clickedInside = path.find((e: any) => e === this.elementRef.nativeElement);
    if (!clickedInside) {
      this.isActive = false;
    }
  }

  toggle() {
    this.isActive = !this.isActive;
  }

  createInviteWithLink(boardId: number) {
  //   this.inviteService.InviteKey$(boardId).subscribe( (response: any) => {
  //     this.invite = `http://localhost:4200/invite/${response.key}`
  //   })
  }
}
