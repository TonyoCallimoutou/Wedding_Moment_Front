import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlanTablePageComponent} from "./plan-table-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardPlanTableModule} from "../../../shared/component/card-plan-table/card-plan-table.module";
import {SearchBarModule} from "../../../shared/component/search-bar/search-bar.module";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {MatIconModule} from "@angular/material/icon";
import {CardPlanTableNewModule} from "../../../shared/component/card-plan-table-new/card-plan-table-new.module";
import {DropdownMenuModule} from "../../../shared/component/dropdown-menu/dropdown-menu.module";


@NgModule({
  declarations: [
    PlanTablePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardPlanTableModule,
    SearchBarModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    TranslateModule,
    CapitalizeFirstLetterPipeModule,
    MatIconModule,
    CardPlanTableNewModule,
    DropdownMenuModule,
  ],
  exports: [PlanTablePageComponent],
})
export class PlanTablePageModule {
}
