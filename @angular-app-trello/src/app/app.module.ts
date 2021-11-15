import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HeaderPublicComponent} from './public/header-public/header-public.component';
import {SharedModule} from './shared/shared.module';

import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
// import {SearchPipe} from "./pipes/search.pipe";

registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent,
        HeaderPublicComponent,
        // SearchPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        BrowserAnimationsModule,
    ],
    providers: [
        CookieService,
        { provide: LOCALE_ID, useValue: 'ru' }
    ],
    bootstrap: [AppComponent],
    exports: [
        // SearchPipe
    ]
})
export class AppModule {
}
