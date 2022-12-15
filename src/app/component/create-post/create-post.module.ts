import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreatePostComponent } from './create-post.component';


@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CreatePostComponent]
})
export class CreatePostModule { }
