import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { Comment } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user.model';
import { CommentModelService } from 'src/app/viewModel/comment-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();


  currentUser: User;
  pictureId: any;
  comments: Comment[] = [];

  constructor(
    private commentModelService: CommentModelService,
    private userModelService: UserModelService,
    private route: ActivatedRoute) {
      this.currentUser = userModelService.getCurrentUser();
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

    this.route.paramMap
      .pipe(take(1))
      .subscribe((params: ParamMap) => {
        this.pictureId = Number(params.get('id'));
      })

    this.commentModelService.getCommentsByPictureId(this.pictureId)
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
