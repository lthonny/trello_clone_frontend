import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderPublicComponent } from './public/header-public/header-public.component';
import { SharedModule } from './shared/shared.module';

import {CookieService} from "ngx-cookie-service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
