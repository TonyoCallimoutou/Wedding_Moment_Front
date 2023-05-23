import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormulaireInscriptionComponent} from "./formulaire-inscription.component";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {AutosizeModule} from "ngx-autosize";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {GenericImageCropperModule} from "../../../shared/component/generic-image-cropper/generic-image-cropper.module";


@NgModule({
  declarations: [
    FormulaireInscriptionComponent
  ],
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    AutosizeModule,
    MatButtonModule,
    NgForOf,
    MatIconModule,
    TranslateModule,
    MatProgressBarModule,
    NgIf,
    FormsModule,
    CapitalizeFirstLetterPipeModule,
    GenericImageCropperModule,
  ],
  exports: [FormulaireInscriptionComponent]
})
export class FormulaireInscriptionModule {
}
