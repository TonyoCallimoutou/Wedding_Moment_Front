import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardMenuComponent} from "./card-menu.component";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CardMenuComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ],
  exports: [CardMenuComponent]
})
export class CardMenuModule {
}
