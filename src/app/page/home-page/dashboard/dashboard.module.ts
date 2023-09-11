import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PresentationPageModule} from '../presentation-page/presentation-page.module';
import {PostPageModule} from '../post-page/post-page.module';
import {UserPageModule} from '../user-page/user-page.module';
import {DashboardComponent} from './dashboard.component';
import {PlanTablePageModule} from "../plan-table-page/plan-table-page.module";
import {MenuPageModule} from "../menu-page/menu-page.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";
import {CapitalizeFirstLetterPipeModule} from "../../../shared/pipes/capitalize-first-lettre.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ReportPageModule} from "../post-page/report-page/report-page.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        PostPageModule,
        UserPageModule,
        PresentationPageModule,
        PlanTablePageModule,
        MenuPageModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        TranslateModule,
        CapitalizeFirstLetterPipeModule,
        MatDialogModule,
        ReportPageModule
    ]
})
export class DashboardModule {
}
