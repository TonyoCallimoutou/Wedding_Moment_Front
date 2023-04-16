import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchButtonComponent} from './switch-button.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SwitchButtonComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ],
  exports: [
    SwitchButtonComponent
  ]
})
export class SwitchButtonModule { }
