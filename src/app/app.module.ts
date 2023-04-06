import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';

import {AppComponent} from './app.component';
import {environment} from 'src/environments/environment';
import {SignUpComponent} from './page/firebase-auth-component/sign-up/sign-up.component';
import {ForgotPasswordComponent} from './page/firebase-auth-component/forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './page/firebase-auth-component/verify-email/verify-email.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './service/auth.service';
import {SocketIoService} from './service/socket-io.service';
import {DashboardModule} from './page/home-page/dashboard/dashboard.module';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {HomePageComponent} from './page/home-page/home-page.component';
import { TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatIconModule} from "@angular/material/icon";
import { GenericDialogComponent } from './shared/component/generic-dialog/generic-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { GenericImageCropperComponent } from './shared/component/generic-image-cropper/generic-image-cropper.component';
import {ImageCropperModule} from "ngx-image-cropper";
import { DropdownMenuComponent } from './shared/component/dropdown-menu/dropdown-menu.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PageNotFoundComponent,
    HomePageComponent,
    GenericDialogComponent
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
    DashboardModule,
    MatDialogModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService, SocketIoService],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
