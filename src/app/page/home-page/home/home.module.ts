import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {HomeComponent} from "./home.component";
import {AuthModule} from "../../../shared/component/auth/auth.module";
import {MatTabsModule} from "@angular/material/tabs";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {AutosizeModule} from "ngx-autosize";
import {MatIconModule} from "@angular/material/icon";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {ShareButtonModule} from "../../../shared/component/share-button/share-button.module";
import {ZXingScannerModule} from "@zxing/ngx-scanner";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        AuthModule,
        MatTabsModule,
        TranslateModule,
        CapitalizeFirstLetterPipeModule,
        MatInputModule,
        FormsModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatCardModule,
        AutosizeModule,
        MatIconModule,
        ClipboardModule,
        ShareButtonModule,
        ZXingScannerModule,
    ]
})
export class HomeModule {
}
