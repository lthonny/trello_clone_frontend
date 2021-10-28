import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateLayoutComponent} from './private-layout/private-layout.component';
import {RouterModule} from '@angular/router';
import {
  DashboardPageComponent,
} from './dashboard-page/dashboard-page.component';
import {LoginComponent} from './auth/login-page/login.component';
import {RegComponent} from './auth/signup-page/reg.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthInterceptor} from "../services/auth.interceptor";

import {QuillModule} from "ngx-quill";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {AuthGuard} from "../services/auth.guard";

import {BoardService} from "../services/board.service";
import {BoardsComponent} from './boards-page/boards.component';
import {TaskService} from "../services/task.service";
import {MaterialModule} from "../material.module";
import {MatButtonModule} from "@angular/material/button";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PopoverComponent} from "../popovers/popever/popover.component";
import {TaskDescriptionComponent} from "./dashboard-page/task-description/task-description.component";
import {SidenavAutosizeComponent} from "../popovers/sidenav-autosize/sidenav-autosize.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ArchiveTasksService} from "../services/archive.tasks.service";
import {SocialLoginModule} from "angularx-social-login";
import {InviteService} from "../services/invite.service";
import { InvitePageComponent } from './invite-page/invite-page.component';
import {AssignedService} from "../services/assigned.service";


@NgModule({
  declarations: [
    PrivateLayoutComponent,
    LoginComponent,
    RegComponent,
    DashboardPageComponent,

    BoardsComponent,
    PopoverComponent,
    TaskDescriptionComponent,
    SidenavAutosizeComponent,
    InvitePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    DragDropModule,
    NgbModule,

    RouterModule.forChild([
      {path: 'login-page', component: LoginComponent},
      {path: 'signup-page', component: RegComponent},
      {path: 'invite/:id/:key', component: InvitePageComponent, canActivate: [AuthGuard]},
      {
        path: '', component: PrivateLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login-page', pathMatch: 'full'},
          {path: 'boards', component: BoardsComponent, canActivate: [AuthGuard]},
          {path: 'boards-page/:id', component: DashboardPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ]),
    MaterialModule,
    MatButtonModule,
    MatSidenavModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    QuillModule,
    NgbModule
  ],
  providers: [
    BoardService,
    TaskService,
    ArchiveTasksService,
    InviteService,
    AssignedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class PrivateModule {
}
