import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {AutosizeModule} from "ngx-autosize";
import {CapitalizeFirstLetterPipeModule} from "../../../../shared/pipes/capitalize-first-lettre.module";



@NgModule({
    declarations: [
        ReportPageComponent
    ],
    exports: [
        ReportPageComponent
    ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    AutosizeModule,
    CapitalizeFirstLetterPipeModule
  ]
})
export class ReportPageModule { }
