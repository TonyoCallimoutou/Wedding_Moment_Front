import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentButtonModule } from 'src/app/component/button-component/comment-button/comment-button.module';
import { DeleteButtonModule } from 'src/app/component/button-component/delete-button/delete-button.module';
import { LikeButtonModule } from 'src/app/component/button-component/like-button/like-button.module';
import { CreatePostModule } from 'src/app/component/create-post/create-post.module';
import { PostModelService } from 'src/app/viewModel/post-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { PostPageComponent } from './post-page.component';


@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    CommentButtonModule,
    DeleteButtonModule,
    CreatePostModule
  ],
  exports: [PostPageComponent],
  providers: [PostModelService, UserModelService]
})
export class PostPageModule { }
