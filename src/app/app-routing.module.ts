import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from "@angular/router";
import { DashboardComponent } from "./page/home-page/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./page/firebase-auth-component/forgot-password/forgot-password.component";
import { SignInComponent } from "./page/firebase-auth-component/sign-in/sign-in.component";
import { SignUpComponent } from "./page/firebase-auth-component/sign-up/sign-up.component";
import { VerifyEmailComponent } from "./page/firebase-auth-component/verify-email/verify-email.component";
import { AuthGuard } from './service/auth.guard';
import { PresentationPageComponent } from './page/home-page/presentation-page/presentation-page.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { SettingPageComponent } from './page/setting-page/setting-page.component';
import { HomePageComponent } from "./page/home-page/home-page.component";

const routes: Routes = [
    { path: '', redirectTo: '/HomePage', pathMatch: 'full' },
    { path: 'HomePage', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'sign-in', component: SignInComponent },
    { path: 'register-user', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'comments', component: PresentationPageComponent, canActivate: [AuthGuard] },
    { path: 'setting', component: SettingPageComponent, canActivate: [AuthGuard] },

    // Last Path
    {path: '**', component: PageNotFoundComponent, canActivate:[AuthGuard] },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
