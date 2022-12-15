import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentPageModule } from '../comment-page/comment-page.module';
import { PostPageModule } from '../post-page/post-page.module';
import { UserPageModule } from '../user-page/user-page.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PostPageModule,
    UserPageModule,
    CommentPageModule
  ]
})
export class DashboardModule { }
