import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./login.component";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../pipes/capitalize-first-lettre.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    LoginComponent
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
  exports: [LoginComponent]
})
export class LoginModule {
}
