import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SettingButtonComponent} from './setting-button.component';


@NgModule({
  declarations: [
    SettingButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SettingButtonComponent]
})
export class SettingButtonModule {
}
