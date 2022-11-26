import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Comment } from 'src/app/model/comment.model';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();


  currentUser: any;
  picture: any;
  comments: Comment[] = [];

  constructor(
    private commentModelService: CommentModelService,
    private userModelService: UserModelService,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  /**
   * Init data
   */
  initData() {

    this.currentUser = this.userModelService.getCurrentUser();

    this.picture = history.state;

    this.commentModelService.getCommentsByPictureId(this.picture.pictureId)
      .pipe(takeUntil(this.onDestroy$))
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
      this.commentModelService.createComment(this.picture, comment)
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
