import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteButtonModule } from 'src/app/component/button-component/delete-button/delete-button.module';
import { LikeButtonModule } from 'src/app/component/button-component/like-button/like-button.module';
import { EventModelService } from 'src/app/viewModel/event-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { PresentationPageComponent } from './presentation-page.component';


@NgModule({
  declarations: [
    PresentationPageComponent
  ],
  imports: [
    CommonModule,
    LikeButtonModule,
    DeleteButtonModule
  ],
  exports: [PresentationPageComponent],
  providers: [EventModelService, UserModelService]
})
export class PresentationPageModule { }
