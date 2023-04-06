import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownMenuComponent} from "./dropdown-menu.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    DropdownMenuComponent
  ]
})
export class DropdownMenuModule { }
