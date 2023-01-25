import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {PlanTablePageComponent} from "./plan-table-page.component";


@NgModule({
  declarations: [
    PlanTablePageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [PlanTablePageComponent],
})
export class PlanTablePageModule { }
