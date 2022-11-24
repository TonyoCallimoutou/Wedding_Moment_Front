import { NgModule } from '@angular/core';
import { LikeButtonModule } from 'src/app/component/like-button/like-button.module';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { UserPageComponent } from './user-page.component';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    LikeButtonModule
  ],
  exports: [UserPageComponent],
  providers: [UserModelService]
})
export class UserPageModule { }
