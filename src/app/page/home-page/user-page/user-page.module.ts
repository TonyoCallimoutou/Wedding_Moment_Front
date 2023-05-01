import {NgModule} from '@angular/core';
import {LikeButtonModule} from 'src/app/shared/component/button-component/like-button/like-button.module';
import {SettingButtonModule} from 'src/app/shared/component/button-component/setting-button/setting-button.module';
import {UserModelService} from 'src/app/viewModel/user-model.service';
import {UserPageComponent} from './user-page.component';
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AuthModule} from "../../../shared/component/auth/auth.module";


@NgModule({
  declarations: [
    UserPageComponent
  ],
    imports: [
        LikeButtonModule,
        SettingButtonModule,
        NgIf,
        NgClass,
        TranslateModule,
        TitleCasePipe,
        CapitalizeFirstLetterPipeModule,
        GenericImageCropperModule,
        FormsModule,
        MatExpansionModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        NgForOf,
        AuthModule
    ],
  exports: [UserPageComponent],
  providers: [UserModelService]
})
export class UserPageModule {
}
