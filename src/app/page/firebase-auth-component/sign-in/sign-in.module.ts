import {NgModule} from '@angular/core';

import {SignInComponent} from "./sign-in.component";
import {LoginModule} from "../../../shared/component/auth/login/login.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SignInComponent
  ],
    imports: [
        LoginModule,
        MatIconModule
    ],
  exports: [SignInComponent]
})
export class SignInModule {
}
