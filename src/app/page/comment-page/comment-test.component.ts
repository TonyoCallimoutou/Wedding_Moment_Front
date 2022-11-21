import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

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
    private commentModelService: CommentModelService,
    private userModelservice: UserModelService,
    private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.initData();
  }

  /**
   * Init data
   */
  initData() {

    this.currentUser = this.userModelservice.getCurrentUser();

    this.route.paramMap
    .subscribe((params: ParamMap) => {
      this.pictureId = Number(params.get('id'));
    })

    this.commentModelService.getCommentsByPictureId(this.pictureId)
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
      this.commentModelService.createComment(this.pictureId, comment)
    }
  }

  /**
   * delete comment
   * @param comment 
   */
  removeComment(comment: Comment) {
    this.commentModelService.removeComment(comment);
  }

  /**
   * Like or Dislike comment
   * @param commentId 
   */
  likeComment(comment: Comment) {
    this.userModelservice.likeComment(comment);
  }
}
