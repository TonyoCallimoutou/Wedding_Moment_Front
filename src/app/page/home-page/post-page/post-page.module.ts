import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DeleteButtonModule} from 'src/app/shared/component/button-component/delete-button/delete-button.module';
import {LikeButtonModule} from 'src/app/shared/component/button-component/like-button/like-button.module';
import {CreatePostModule} from 'src/app/shared/component/button-component/create-post/create-post.module';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {PostPageComponent} from './post-page.component';
import {SignInModule} from "../../firebase-auth-component/sign-in/sign-in.module";
import {CardPostModule} from "../../../shared/component/card-post/card-post.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule,
    CreatePostModule,
    SignInModule,
    CardPostModule,
    TranslateModule
  ],
  exports: [PostPageComponent],
  providers: [PostModelService, UserModelService]
})
export class PostPageModule {
}
