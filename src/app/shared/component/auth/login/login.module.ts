import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./login.component";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../pipes/capitalize-first-lettre.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CapitalizeFirstLetterPipeModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {
}
