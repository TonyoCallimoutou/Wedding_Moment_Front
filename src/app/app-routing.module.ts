import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./component/firebase-auth-component/forgot-password/forgot-password.component";
import { SignInComponent } from "./component/firebase-auth-component/sign-in/sign-in.component";
import { SignUpComponent } from "./component/firebase-auth-component/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./component/firebase-auth-component/verify-email/verify-email.component";
import { AuthGuard } from './service/auth.guard';
import { CommentTestComponent } from './page/comment-page/comment-test.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register-user', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },

    { path: 'comments/:id', component: CommentTestComponent },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}