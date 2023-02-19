import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MenuPageComponent} from "./menu-page.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MenuPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [MenuPageComponent],
})
export class MenuPageModule {
}
