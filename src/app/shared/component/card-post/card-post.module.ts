import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPostComponent} from "./card-post.component";
import {LikeButtonModule} from "../button-component/like-button/like-button.module";
import {DeleteButtonModule} from "../button-component/delete-button/delete-button.module";
import {DropdownMenuModule} from "../dropdown-menu/dropdown-menu.module";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../pipes/capitalize-first-lettre.module";
import {MatIconModule} from "@angular/material/icon";
import {LottieComponent} from "ngx-lottie";


@NgModule({
  declarations: [
    CardPostComponent,
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule,
    DropdownMenuModule,
    MatDialogModule,
    TranslateModule,
    CapitalizeFirstLetterPipeModule,
    MatIconModule,
    LottieComponent,
  ],
  exports: [CardPostComponent]
})
export class CardPostModule {
}
