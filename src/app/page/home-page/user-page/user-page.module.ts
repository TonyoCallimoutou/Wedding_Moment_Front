import {NgModule} from '@angular/core';
import {LikeButtonModule} from 'src/app/shared/component/button-component/like-button/like-button.module';
import {SettingButtonModule} from 'src/app/shared/component/button-component/setting-button/setting-button.module';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {UserPageComponent} from './user-page.component';
import {NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {SignInModule} from "../../firebase-auth-component/sign-in/sign-in.module";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserPageComponent
  ],
    imports: [
        LikeButtonModule,
        SettingButtonModule,
        NgIf,
        SignInModule,
        NgClass,
        TranslateModule,
        TitleCasePipe,
        CapitalizeFirstLetterPipeModule,
        GenericImageCropperModule,
        FormsModule
    ],
  exports: [UserPageComponent],
  providers: [UserModelService]
})
export class UserPageModule {
}
