import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPlanTableComponent} from "./card-plan-table.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {FormsModule} from "@angular/forms";
import {ResizableModule} from "angular-resizable-element";


@NgModule({
  declarations: [
    CardPlanTableComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    ResizableModule,
    FormsModule
  ],
  exports: [CardPlanTableComponent]
})
export class CardPlanTableModule {
}
