import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPostComponent} from "./card-post.component";
import {LikeButtonModule} from "../button-component/like-button/like-button.module";
import {DeleteButtonModule} from "../button-component/delete-button/delete-button.module";


@NgModule({
  declarations: [
    CardPostComponent,
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule
  ],
  exports: [CardPostComponent]
})
export class CardPostModule {
}
