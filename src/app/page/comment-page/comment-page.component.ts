import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {

  currentUser: any;
  pictureId: any;
  comments: Comment[] = [];

  constructor(
    private commentModelService: CommentModelService,
    private userModelService: UserModelService,
    private route: ActivatedRoute) {
    }

  ngOnInit() {
    this.initData();
  }

  /**
   * Init data
   */
  initData() {

    this.currentUser = this.userModelService.getCurrentUser();

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
    this.userModelService.likeComment(comment);
  }

  /**
   * Return if comment is like or not
   * @param commentId 
   */
  commentIsLike(commentId: number): boolean {
    return this.userModelService.isLikeComment(commentId)
  }
}
