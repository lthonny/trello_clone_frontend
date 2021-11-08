import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {QuillModule} from "ngx-quill";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MaterialModule} from "../material.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AuthGuard} from "../services/auth.guard";

import {AssignedService} from "../services/assigned.service";
import {BoardService} from "../services/board.service";
import {TaskService} from "../services/task.service";
import {ArchiveTasksService} from "../services/archive.tasks.service";
import {InviteService} from "../services/invite.service";
import {TransactionService} from "../services/transaction.service";

import {PrivateLayoutComponent} from './private-layout/private-layout.component';
import {TaskDescriptionComponent} from "./dashboard-page/task-description/task-description.component";
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AddBoardComponent, BoardsComponent} from './boards-page/boards.component';
import {SidenavAutosizeComponent} from "../popovers/sidenav-autosize/sidenav-autosize.component";
import {PopoverComponent} from "../popovers/popever/popover.component";
import {InvitePageComponent} from './invite-page/invite-page.component';
import {AuthInterceptor} from "../services/auth.interceptor";
import {LoginComponent} from './auth/login-page/login.component';
import {RegComponent} from './auth/signup-page/reg.component';
import {MatDividerModule} from "@angular/material/divider";
import {InvitePopoverComponent} from "./dashboard-page/invite-popover/invite-popover.component";

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
    InvitePageComponent,
    AddBoardComponent,
    InvitePopoverComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    DragDropModule,

    RouterModule.forChild([
      {
        path: 'login-page',
        component: LoginComponent
      },
      {
        path: 'signup-page',
        component: RegComponent
      },
      {
        path: 'invite/:id/:key',
        component: InvitePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '', component: PrivateLayoutComponent, children: [
          {
            path: '',
            redirectTo: '/admin/login-page',
            pathMatch: 'full'
          },
          {
            path: 'boards',
            component: BoardsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'boards-page/:id',
            component: DashboardPageComponent,
            canActivate: [AuthGuard]
          }
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
    QuillModule,
    NgbModule
  ],
  providers: [
    BoardService,
    TaskService,
    ArchiveTasksService,
    InviteService,
    AssignedService,
    TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class PrivateModule {
}
