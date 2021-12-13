import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardsComponent} from './boards.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent],
      imports: [HttpClientModule, RouterTestingModule, MatDialogModule, BrowserDynamicTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BoardsComponent', () => {
    expect(component).toBeTruthy();
  });
});
