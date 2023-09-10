import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DeleteButtonModule} from 'src/app/shared/component/button-component/delete-button/delete-button.module';
import {LikeButtonModule} from 'src/app/shared/component/button-component/like-button/like-button.module';
import {CreatePostModule} from 'src/app/shared/component/button-component/create-post/create-post.module';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {PostPageComponent} from './post-page.component';
import {CardPostModule} from "../../../shared/component/card-post/card-post.module";
import {TranslateModule} from "@ngx-translate/core";
import {SwitchButtonModule} from "../../../shared/component/button-component/switch-button/switch-button.module";
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";
import {AuthModule} from "../../../shared/component/auth/auth.module";
import {MatButtonModule} from "@angular/material/button";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {GeneratePictureComponent} from './generate-picture/generate-picture.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {ImageCropperModule} from "ngx-image-cropper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    PostPageComponent,
    GeneratePictureComponent,
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule,
    CreatePostModule,
    CardPostModule,
    TranslateModule,
    SwitchButtonModule,
    GenericImageCropperModule,
    AuthModule,
    MatButtonModule,
    CapitalizeFirstLetterPipeModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    ImageCropperModule,
    MatDialogModule,
    MatSliderModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule
  ],
  exports: [PostPageComponent, GeneratePictureComponent],
  providers: [PostModelService, UserModelService]
})
export class PostPageModule {
}
