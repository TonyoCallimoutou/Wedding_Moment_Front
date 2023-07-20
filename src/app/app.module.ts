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
import {AuthInterceptor} from './service/auth/auth.interceptor';
import {ResponseInterceptor} from "./service/auth/response.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HomeModule} from "./page/home-page/home/home.module";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {CguDialogComponent} from './shared/component/cgu-dialog/cgu-dialog.component';
import {DialogQrCodeComponent} from "./shared/component/dialog-qr-code/dialog-qr-code.component";
import {DialogLinkComponent} from "./shared/component/dialog-link/dialog-link.component";
import {ShareButtonModule} from "./shared/component/share-button/share-button.module";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatCardModule} from "@angular/material/card";
import {CapitalizeFirstLetterPipeModule} from "./shared/pipes/capitalize-first-lettre.module";
import {MatMenuModule} from "@angular/material/menu";
import {LoaderModule} from "./shared/component/loader/loader.module";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GenericDialogComponent,
    CguDialogComponent,
    DialogQrCodeComponent,
    DialogLinkComponent,
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
        NgxQRCodeModule,
        BrowserAnimationsModule,
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
        ShareButtonModule,
        ClipboardModule,
        MatCardModule,
        CapitalizeFirstLetterPipeModule,
        MatMenuModule,
        LoaderModule,
    ],
  providers: [
    AuthService,
    SocketIoService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
