import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./component/firebase-component/forgot-password/forgot-password.component";
import { SignInComponent } from "./component/firebase-component/sign-in/sign-in.component";
import { SignUpComponent } from "./component/firebase-component/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./component/firebase-component/verify-email/verify-email.component";
import { AuthGuard } from './service/auth.guard';
import { CommentTestComponent } from './component/sup-test/comment-test/comment-test.component';

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