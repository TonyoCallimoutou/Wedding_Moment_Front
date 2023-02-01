import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {PlanTablePageComponent} from "./plan-table-page.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PlanTablePageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
    ],
  exports: [PlanTablePageComponent],
})
export class PlanTablePageModule { }
