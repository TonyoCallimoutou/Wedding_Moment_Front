import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LikeButtonModule } from 'src/app/component/like-button/like-button.module';
import { PictureModelService } from 'src/app/viewModel/picture-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { PicturePageComponent } from './picture-page.component';


@NgModule({
  declarations: [
    PicturePageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule
  ],
  exports: [PicturePageComponent],
  providers: [PictureModelService, UserModelService]
})
export class PicturePageModule { }
