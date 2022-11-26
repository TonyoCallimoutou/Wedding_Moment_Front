import { NgModule } from '@angular/core';
import { LikeButtonModule } from 'src/app/component/button-component/like-button/like-button.module';
import { SettingButtonModule } from 'src/app/component/button-component/setting-button/setting-button.module';
import { UserModelService } from 'src/app/viewModel/user-model.service';
import { UserPageComponent } from './user-page.component';


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    LikeButtonModule,
    SettingButtonModule
  ],
  exports: [UserPageComponent],
  providers: [UserModelService]
})
export class UserPageModule { }
