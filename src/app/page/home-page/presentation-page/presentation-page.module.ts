import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EventModelService} from 'src/app/viewModel/event-model.service';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {PresentationPageComponent} from './presentation-page.component';
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";
import {MatIconModule} from "@angular/material/icon";
import {DropdownMenuModule} from "../../../shared/component/dropdown-menu/dropdown-menu.module";
import {FormsModule} from "@angular/forms";
import {AutosizeModule} from "ngx-autosize";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    PresentationPageComponent
  ],
    imports: [
        CommonModule,
        GenericImageCropperModule,
        MatIconModule,
        DropdownMenuModule,
        FormsModule,
        AutosizeModule,
        MatButtonModule,
        MatDialogModule
    ],
  exports: [PresentationPageComponent],
  providers: [EventModelService, UserModelService]
})
export class PresentationPageModule {
}
