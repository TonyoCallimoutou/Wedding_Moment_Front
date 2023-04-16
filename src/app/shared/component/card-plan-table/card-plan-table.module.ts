import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPlanTableComponent} from "./card-plan-table.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import {ResizableModule} from "angular-resizable-element";
import {CardDetailPlanTableComponent} from './card-detail-plan-table/card-detail-plan-table.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CardPlanTableComponent,
    CardDetailPlanTableComponent
  ],
    imports: [
        CommonModule,
        DragDropModule,
        ResizableModule,
        FormsModule,
        TranslateModule
    ],
  exports: [CardPlanTableComponent, CardDetailPlanTableComponent]
})
export class CardPlanTableModule {
}
