import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment-test',
  templateUrl: './comment-test.component.html',
  styleUrls: ['./comment-test.component.scss']
})
export class CommentTestComponent implements OnInit {

  currentUser: any;
  pictureId: any;
  comments: Comment[] = [];

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.initData();
  }

  /**
   * Init data
   */
  initData() {

    this.currentUser = this.authService.getCurrentUser();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.pictureId = params.get('id');
    })

    this.commentService.getCommentsByPictureId(this.pictureId)
    .subscribe( (data) => {
      this.comments = data;
    })
  }

  /**
   * add new comment
   * @param comment 
   */
  addComment(comment:string) {
    if (comment) {
      this.authService.createComment(this.pictureId, comment)
    }
  }

  /**
   * delete comment
   * @param comment 
   */
  removeComment(comment: Comment) {
    this.authService.removeComment(comment);
  }

  /**
   * Like or Dislike comment
   * @param commentId 
   */
  likeComment(commentId: number) {
    this.authService.likeComment(commentId);
  }
}
