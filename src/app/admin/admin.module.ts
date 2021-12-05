import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {CookieService} from "ngx-cookie-service";

import {HeaderComponent} from './header/components/header/header.component';
import {AuthInterceptor} from "./auth/services/auth.interceptor";

import {SharedModule} from "../shared/shared.module";
import {AdminRoutingModule} from "./admin-routing.module";
import {AuthModule} from "./auth/auth.module";
import {DashboardModule} from "./dashboard-page/dashboard.module";
import {BoardModule} from "./board-page/board.module";
import {InviteModule} from "./invite-page/invite.module";
import {ApiModule} from "./services/module/api.module";

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
    DashboardModule,
    BoardModule,
    InviteModule,
    ApiModule,
    AdminRoutingModule,
  ],
  exports: [],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ]
})
export class AdminModule {
}
