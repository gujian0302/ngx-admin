/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbOAuth2AuthStrategy, NbAuthModule, NbOAuth2GrantType,
  NbAuthOAuth2JWTToken, NbOAuth2ClientAuthMethod } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'email',
          clientId: 'admin',
          clientSecret: '123456',
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          token: {
            endpoint: '/api/oauth/token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2JWTToken,
          },
          refresh: {
            endpoint: '/api/oauth/refresh',
          },
        }),
      ],
    }),

    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['news', 'comments'],
        },
        user: {
          parent: 'guest',
          create: 'comments',
        },
        moderator: {
          parent: 'user',
          create: 'news',
          remove: '*',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NbRoleProvider, useValue: {
      getRole: () => {
        return of('guest');
        },
      },
    },
  ],
})
export class AppModule {
}
