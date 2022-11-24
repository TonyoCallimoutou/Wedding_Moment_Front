import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentPageModule } from '../comment-page/comment-page.module';
import { PicturePageModule } from '../picture-page/picture-page.module';
import { UserPageModule } from '../user-page/user-page.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PicturePageModule,
    UserPageModule,
    CommentPageModule
  ]
})
export class DashboardModule { }
