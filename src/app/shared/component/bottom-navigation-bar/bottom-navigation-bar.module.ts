import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottomNavigationBarComponent} from "./bottom-navigation-bar.component";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    BottomNavigationBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule

  ],
  exports: [
    BottomNavigationBarComponent
  ]
})
export class BottomNavigationBarModule { }
