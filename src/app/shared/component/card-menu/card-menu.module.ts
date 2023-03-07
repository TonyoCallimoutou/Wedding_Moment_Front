import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardMenuComponent} from "./card-menu.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CardMenuComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CardMenuComponent]
})
export class CardMenuModule {
}
