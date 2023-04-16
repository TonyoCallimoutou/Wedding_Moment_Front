import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBarComponent} from "./search-bar.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    SearchBarComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule
    ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchBarModule { }
