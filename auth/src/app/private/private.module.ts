import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../services/auth.guard';
import { CreatePageComponent } from './create-page/create-page.component';
import { TasksService } from '../services/tasks.service';



@NgModule({
  declarations: [
    PrivateLayoutComponent,
    LoginComponent,
    RegComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forChild([
      {
        path: '', component: PrivateLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          { path: 'reg', component: RegComponent },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          // { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
        ]
      }
    ])
  ],
  exports: [
    RouterModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    TasksService
  ]
})
export class PrivateModule { }
