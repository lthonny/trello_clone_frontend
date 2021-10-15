import {Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {

  @Input()
  buttonText: string = '';
  isActive = false;

  constructor() {}

  toggle() {
    this.isActive = !this.isActive;
  }

}
