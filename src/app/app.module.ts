import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { UserTestComponent } from './page/user-page/user-test.component';
import { CommentTestComponent } from './page/comment-page/comment-test.component';
import { PictureTestComponent } from './page/picture-page/picture-test.component';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SignInComponent } from './component/firebase-auth-component/sign-in/sign-in.component';
import { SignUpComponent } from './component/firebase-auth-component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/firebase-auth-component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/firebase-auth-component/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    UserTestComponent,
    CommentTestComponent,
    PictureTestComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
