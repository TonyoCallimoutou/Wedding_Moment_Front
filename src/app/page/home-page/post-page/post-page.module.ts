import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {PostPageComponent} from './post-page.component';
import {CardPostModule} from "../../../shared/component/card-post/card-post.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {GeneratePictureComponent} from './generate-picture/generate-picture.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";


@NgModule({
  declarations: [
    PostPageComponent,
    GeneratePictureComponent,
  ],
  imports: [
    CommonModule,
    CardPostModule,
    TranslateModule,
    GenericImageCropperModule,
    MatButtonModule,
    CapitalizeFirstLetterPipeModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    InfiniteScrollModule,
  ],
  exports: [PostPageComponent, GeneratePictureComponent],
  providers: [PostModelService, UserModelService]
})
export class PostPageModule {
}
