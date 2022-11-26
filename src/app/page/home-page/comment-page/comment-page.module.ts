import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteButtonModule } from 'src/app/component/button-component/delete-button/delete-button.module';
import { LikeButtonModule } from 'src/app/component/button-component/like-button/like-button.module';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { CommentPageComponent } from './comment-page.component';


@NgModule({
  declarations: [
    CommentPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule
  ],
  exports: [CommentPageComponent],
  providers: [CommentModelService, UserModelService]
})
export class CommentPageModule { }
