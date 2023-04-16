import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./page/home-page/dashboard/dashboard.component";
import {ForgotPasswordComponent} from "./page/firebase-auth-component/forgot-password/forgot-password.component";
import {SignInComponent} from "./page/firebase-auth-component/sign-in/sign-in.component";
import {SignUpComponent} from "./page/firebase-auth-component/sign-up/sign-up.component";
import {VerifyEmailComponent} from "./page/firebase-auth-component/verify-email/verify-email.component";
import {AuthGuard} from './service/auth.guard';
import {PageNotFoundComponent} from './page/page-not-found/page-not-found.component';
import {HomePageComponent} from "./page/home-page/home-page.component";
import {GenericImageCropperComponent} from "./shared/component/generic-image-cropper/generic-image-cropper.component";

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: 'test', component: GenericImageCropperComponent},

  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  // Last Path
  {path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
