import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment.model';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment-test',
  templateUrl: './comment-test.component.html',
  styleUrls: ['./comment-test.component.scss']
})
export class CommentTestComponent implements OnInit {

  comments: Comment[] = [];

  constructor(
    private commentService: CommentService) {
      this.ngOnInit()
    }

  ngOnInit() {
    this.commentService.getAll()
    .subscribe( (data) => {
      this.comments = data;
    })
  }

}
