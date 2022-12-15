import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentButtonModule } from 'src/app/component/button-component/comment-button/comment-button.module';
import { DeleteButtonModule } from 'src/app/component/button-component/delete-button/delete-button.module';
import { LikeButtonModule } from 'src/app/component/button-component/like-button/like-button.module';
import { CreatePostModule } from 'src/app/component/create-post/create-post.module';
import { PictureModelService } from 'src/app/viewModel/picture-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { PicturePageComponent } from './picture-page.component';


@NgModule({
  declarations: [
    PicturePageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    CommentButtonModule,
    DeleteButtonModule,
    CreatePostModule
  ],
  exports: [PicturePageComponent],
  providers: [PictureModelService, UserModelService]
})
export class PicturePageModule { }
