import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './page/firebase-auth-component/sign-in/sign-in.component';
import { SignUpComponent } from './page/firebase-auth-component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './page/firebase-auth-component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './page/firebase-auth-component/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './service/auth.service';
import { SocketIoService } from './service/socket-io.service';
import { DashboardModule } from './page/home-page/dashboard/dashboard.module';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SettingPageComponent } from './page/setting-page/setting-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PageNotFoundComponent,
    SettingPageComponent,
    HomePageComponent
  ],
  imports: [
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
