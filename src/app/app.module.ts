import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
