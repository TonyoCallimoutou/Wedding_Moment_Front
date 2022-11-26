import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentButtonComponent } from './comment-button.component';


@NgModule({
  declarations: [
    CommentButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CommentButtonComponent]
})
export class CommentButtonModule { }
