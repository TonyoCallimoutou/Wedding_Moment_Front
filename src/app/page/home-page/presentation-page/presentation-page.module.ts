import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DeleteButtonModule} from 'src/app/shared/component/button-component/delete-button/delete-button.module';
import {LikeButtonModule} from 'src/app/shared/component/button-component/like-button/like-button.module';
import {EventModelService} from 'src/app/viewModel/event-model.service';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {PresentationPageComponent} from './presentation-page.component';
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";
import {MatIconModule} from "@angular/material/icon";
import {DropdownMenuModule} from "../../../shared/component/dropdown-menu/dropdown-menu.module";
import {FormsModule} from "@angular/forms";
import {AutosizeModule} from "ngx-autosize";


@NgModule({
  declarations: [
    PresentationPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule,
    GenericImageCropperModule,
    MatIconModule,
    DropdownMenuModule,
    FormsModule,
    AutosizeModule
  ],
  exports: [PresentationPageComponent],
  providers: [EventModelService, UserModelService]
})
export class PresentationPageModule {
}
