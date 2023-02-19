import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DeleteButtonComponent} from './delete-button.component';


@NgModule({
  declarations: [
    DeleteButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DeleteButtonComponent]
})
export class DeleteButtonModule {
}
