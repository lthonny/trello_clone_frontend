import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HeaderPublicComponent} from './public/header-public/header-public.component';
import {SharedModule} from './shared/shared.module';

import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
    HeaderPublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    SocialLoginModule,
  ],
  providers: [
    CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '700802076060-a48feomksrk878vip7n5ps11s1t4mdfq.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
