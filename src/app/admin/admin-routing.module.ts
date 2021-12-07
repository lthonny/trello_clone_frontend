import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/pages/login-page/login.component";
import {RegComponent} from "./auth/pages/signup-page/reg.component";
import {InviteComponent} from "./invite-page/components/invite/invite.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {HeaderComponent} from "./header/components/header/header.component";
import {BoardsComponent} from "./board-page/components/boards-page/boards.component";
import {DashboardPageComponent} from "./dashboard-page/components/dashboard/dashboard-page.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegComponent
  },
  {
    path: 'invite/:id/:key',
    component: InviteComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/admin/login',
      //   pathMatch: 'full'
      // },
      {
        path: 'boards',
        component: BoardsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'board/:id',
        component: DashboardPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
