import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPlanTableNewComponent} from "./card-plan-table-new.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CardPlanTableNewComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
  ],
  exports: [CardPlanTableNewComponent]
})
export class CardPlanTableNewModule {
}
