import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropperModule} from "ngx-image-cropper";
import {GenericImageCropperComponent} from "./generic-image-cropper.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    GenericImageCropperComponent
  ],
    imports: [
        CommonModule,
        ImageCropperModule,
        MatIconModule,
        MatButtonModule
    ],
  exports: [
    GenericImageCropperComponent
  ]
})
export class GenericImageCropperModule { }
