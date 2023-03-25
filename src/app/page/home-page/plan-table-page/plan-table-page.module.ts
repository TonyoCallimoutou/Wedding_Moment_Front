import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlanTablePageComponent} from "./plan-table-page.component";
import {FormsModule} from "@angular/forms";
import {CardPlanTableModule} from "../../../shared/component/card-plan-table/card-plan-table.module";
import {SearchBarModule} from "../../../shared/component/search-bar/search-bar.module";


@NgModule({
  declarations: [
    PlanTablePageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        CardPlanTableModule,
        SearchBarModule
    ],
  exports: [PlanTablePageComponent],
})
export class PlanTablePageModule {
}
