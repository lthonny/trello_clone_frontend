import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { CreatePageComponent } from './create-page/create-page.component';
import { TasksService } from '../services/tasks.service';
import {AuthInterceptor} from "../services/auth.interceptor";

import {QuillModule} from "ngx-quill";

import {AuthGuard} from "../services/auth.guard";

import {SearchPipe} from "../pipes/search.pipe";
import {FilterPipe} from "../pipes/filter.pipe";
import { EditPageComponent } from './edit-page/edit-page.component';


@NgModule({
  declarations: [
    PrivateLayoutComponent,
    LoginComponent,
    RegComponent,
    CreatePageComponent,
    DashboardPageComponent,
    EditPageComponent,

    FilterPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),

    RouterModule.forChild([
      {
        path: '', component: PrivateLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'reg', component: RegComponent },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'task/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    QuillModule,

    FilterPipe,
    SearchPipe
  ],
  providers: [
    TasksService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ]
})
export class PrivateModule {}
