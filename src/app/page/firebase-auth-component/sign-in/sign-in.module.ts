import { NgModule } from '@angular/core';

import {SignInComponent} from "./sign-in.component";


@NgModule({
  declarations: [
    SignInComponent
  ],
  exports: [SignInComponent]
})
export class SignInModule { }
