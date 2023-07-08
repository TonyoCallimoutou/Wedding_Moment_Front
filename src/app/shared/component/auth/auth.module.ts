import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AuthComponent} from "./auth.component";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../pipes/capitalize-first-lettre.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {LoginComponent} from "./login/login.component";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CapitalizeFirstLetterPipeModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
    exports: [AuthComponent, LoginComponent]
})
export class AuthModule {
}
