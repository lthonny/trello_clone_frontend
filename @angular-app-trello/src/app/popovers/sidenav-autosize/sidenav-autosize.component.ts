import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav-autosize',
  templateUrl: './sidenav-autosize.component.html',
  styleUrls: ['./sidenav-autosize.component.scss']
})
export class SidenavAutosizeComponent implements OnInit {
  public showFiller: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
