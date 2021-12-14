import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/pages/login-page/login.component";
import {RegComponent} from "./auth/pages/signup-page/reg.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {HeaderComponent} from "./header/components/header/header.component";
import {BoardsComponent} from "./board-page/components/boards-page/boards.component";
import {DashboardPageComponent} from "./dashboard-page/components/dashboard/dashboard-page.component";
import {GoogleAuthComponent} from "./auth/pages/google-auth/google-auth.component";
import {InvitePageComponent} from "./invite-page/components/invite-page/invite-page.component";

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
    component: InvitePageComponent,
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'boards',
        component: BoardsComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'gg',
        component: DashboardPageComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'google/auth/user/:id',
        component: GoogleAuthComponent,
      },
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
