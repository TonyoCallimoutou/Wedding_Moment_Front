import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownMenuComponent} from "./dropdown-menu.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    DropdownMenuComponent
  ]
})
export class DropdownMenuModule { }
