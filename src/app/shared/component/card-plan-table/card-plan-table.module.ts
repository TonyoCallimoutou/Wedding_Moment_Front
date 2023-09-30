import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CardPlanTableComponent} from "./card-plan-table.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";
import {CardDetailPlanTableComponent} from "./card-detail-plan-table/card-detail-plan-table.component";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {CapitalizeFirstLetterPipeModule} from "../../pipes/capitalize-first-lettre.module";

@NgModule({
  declarations: [
    CardPlanTableComponent,
    CardDetailPlanTableComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    CapitalizeFirstLetterPipeModule,
  ],
  exports: [CardPlanTableComponent, CardDetailPlanTableComponent]
})
export class CardPlanTableModule {
}
