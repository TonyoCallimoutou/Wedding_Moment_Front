import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageCropperModule} from "ngx-image-cropper";
import {GenericImageCropperComponent} from "./generic-image-cropper.component";



@NgModule({
  declarations: [
    GenericImageCropperComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    GenericImageCropperComponent
  ]
})
export class GenericImageCropperModule { }
