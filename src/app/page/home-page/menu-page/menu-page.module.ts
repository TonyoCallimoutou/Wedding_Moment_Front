import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MenuPageComponent} from "./menu-page.component";


@NgModule({
  declarations: [
    MenuPageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [MenuPageComponent],
})
export class MenuPageModule { }
