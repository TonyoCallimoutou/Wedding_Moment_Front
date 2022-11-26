import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './component/firebase-auth-component/sign-in/sign-in.component';
import { SignUpComponent } from './component/firebase-auth-component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/firebase-auth-component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/firebase-auth-component/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './service/auth.service';
import { SocketIoService } from './service/socket-io.service';
import { DashboardModule } from './page/dashboard/dashboard.module';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    PageNotFoundComponent
  ],
  imports: [
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AuthService, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
