import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';
import { Picture } from 'src/app/model/picture.model';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';
import { PictureService } from 'src/app/service/picture.service';

@Component({
  selector: 'app-picture-test',
  templateUrl: './picture-test.component.html',
  styleUrls: ['./picture-test.component.scss']
})
export class PictureTestComponent implements OnInit {

  pictures: Picture[] = [];

  constructor(
    private authService: AuthService,
    private pictureService: PictureService,
    private commentService: CommentService) {
    }

  ngOnInit() {
    this.pictureService.getAll()
    .subscribe( (data) => {
      this.pictures = data;
    })
  }

  addPicture() {
    this.authService.createPicture((data:any) => {
      pictureUrl: "testUrl"
    })
  }

  removePicture(pictureId: any) {
    this.authService.removePicture(pictureId);
  }

  addComment(pictureId: any) {
    this.authService.createComment(pictureId);
  }

  likePicture(pictureId: any) {
    this.authService.likePicture(pictureId);
  }
}
