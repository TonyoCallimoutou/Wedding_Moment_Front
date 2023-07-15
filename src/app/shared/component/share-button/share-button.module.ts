import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareButtonComponent} from './share-button.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ShareButtonComponent
  ],
  exports: [
    ShareButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ShareButtonModule { }
