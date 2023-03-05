import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MenuPageComponent} from "./menu-page.component";
import {FormsModule} from "@angular/forms";
import {CardMenuModule} from "../../../shared/component/card-menu/card-menu.module";


@NgModule({
  declarations: [
    MenuPageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        CardMenuModule,
    ],
  exports: [MenuPageComponent],
})
export class MenuPageModule {
}
