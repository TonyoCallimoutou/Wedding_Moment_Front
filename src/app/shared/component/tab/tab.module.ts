import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabComponent} from "./tab.component";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [TabComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ],
  exports: [TabComponent]
})
export class TabModule { }
