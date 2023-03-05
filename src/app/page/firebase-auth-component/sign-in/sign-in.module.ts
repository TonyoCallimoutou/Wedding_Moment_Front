import {NgModule} from '@angular/core';

import {SignInComponent} from "./sign-in.component";
import {LoginModule} from "../../../shared/component/auth/login/login.module";


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    LoginModule
  ],
  exports: [SignInComponent]
})
export class SignInModule {
}
