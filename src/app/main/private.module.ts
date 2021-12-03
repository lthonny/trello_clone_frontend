import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {DragDropModule} from "@angular/cdk/drag-drop";
import {MaterialModule} from "../core/modules/material/material.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AuthGuard} from "../core/guards/auth.guard";

import {AssignedService} from "./dashboard/services/assigned.service";
import {BoardService} from "./board/services/board.service";
import {TaskService} from "./dashboard/services/task.service";
import {ArchiveService} from "./dashboard/services/archive.service";

import {PrivateLayoutComponent} from './private-layout/private-layout.component';
import {TaskDescriptionComponent} from "./dashboard/pages/task/task-description.component";
import {DashboardPageComponent} from './dashboard/pages/dashboard/dashboard-page.component';
import {AddBoardComponent, BoardsComponent} from './board/pages/boards-page/boards.component';
import {InvitePageComponent} from './invite/pages/invite-page/invite-page.component';
import {AuthInterceptor} from "./auth/services/auth.interceptor";
import {LoginComponent} from './auth/pages/login-page/login.component';
import {RegComponent} from './auth/pages/signup-page/reg.component';
import {MatDividerModule} from "@angular/material/divider";
import {SearchPipe} from "../core/pipes/search.pipe";
import {ApiDataService} from "./board/services/api.data.service";

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    LoginComponent,
    RegComponent,
    DashboardPageComponent,
    BoardsComponent,
    TaskDescriptionComponent,
    InvitePageComponent,
    AddBoardComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,

    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegComponent },
      { path: 'invite/:id/:key', component: InvitePageComponent, canActivate: [AuthGuard]},
      { path: '', component: PrivateLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
          { path: 'board/:id', component: DashboardPageComponent, canActivate: [AuthGuard] }
        ]
      }
    ]),
    MaterialModule,
    MatDividerModule,
    NgbModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    ApiDataService,
    BoardService,
    TaskService,
    ArchiveService,
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
