import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DashboardPageComponent} from "./dashboard-page.component";
import {SearchPipe} from "../../../../shared/pipes/search.pipe";

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPageComponent, SearchPipe ],
      imports: [ HttpClientTestingModule, HttpClientModule, HttpClientTestingModule, HttpClient, RouterTestingModule, MatDialogModule, BrowserDynamicTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
