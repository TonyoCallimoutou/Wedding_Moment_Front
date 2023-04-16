import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardMenuComponent} from "./card-menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AutosizeModule} from "ngx-autosize";


@NgModule({
  declarations: [
    CardMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AutosizeModule
  ],
  exports: [CardMenuComponent]
})
export class CardMenuModule {
}
