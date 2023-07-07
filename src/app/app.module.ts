import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

import {AppComponent} from './app.component';
import {environment} from 'src/environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth/auth.service';
import {SocketIoService} from './service/socket-io.service';
import {DashboardModule} from './page/home-page/dashboard/dashboard.module';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatIconModule} from "@angular/material/icon";
import {GenericDialogComponent} from './shared/component/generic-dialog/generic-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {FormulaireInscriptionModule} from "./page/website/formulaire-inscription/formulaire-inscription.module";
import { AuthInterceptor } from './service/auth/auth.interceptor';
import {ResponseInterceptor} from "./service/auth/response.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HomeModule} from "./page/home-page/home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GenericDialogComponent,
  ],
    imports: [
        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        FormulaireInscriptionModule,
        DashboardModule,
        MatDialogModule,
        MatIconModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        MatButtonModule,
        MatSnackBarModule,
        HomeModule,
    ],
  providers: [
    AuthService,
    SocketIoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
