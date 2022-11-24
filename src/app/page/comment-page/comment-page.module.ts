import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LikeButtonModule } from 'src/app/component/like-button/like-button.module';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { CommentPageComponent } from './comment-page.component';


@NgModule({
  declarations: [
    CommentPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule
  ],
  exports: [CommentPageComponent],
  providers: [CommentModelService, UserModelService]
})
export class CommentPageModule { }
