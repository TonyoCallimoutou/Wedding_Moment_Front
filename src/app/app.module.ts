import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { UserTestComponent } from './component/sup-test/user-test/user-test.component';
import { CommentTestComponent } from './component/sup-test/comment-test/comment-test.component';
import { PictureTestComponent } from './component/sup-test/picture-test/picture-test.component';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './component/firebase-component/sign-in/sign-in.component';
import { SignUpComponent } from './component/firebase-component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/firebase-component/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './component/firebase-component/verify-email/verify-email.component';
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
