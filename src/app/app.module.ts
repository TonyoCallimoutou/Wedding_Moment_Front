import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserTestComponent } from './Component/user-test/user-test.component';
import { CommentTestComponent } from './Component/comment-test/comment-test.component';
import { PictureTestComponent } from './Component/picture-test/picture-test.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTestComponent,
    CommentTestComponent,
    PictureTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
