import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePopoverComponent } from './invite-popover.component';

describe('InvitePopoverComponent', () => {
  let component: InvitePopoverComponent;
  let fixture: ComponentFixture<InvitePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitePopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
