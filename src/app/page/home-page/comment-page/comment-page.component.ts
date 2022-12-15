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


  public currentUser: User;
  public post: any;
  public comments: Comment[] = [];
  public likeCommentId: number[] = [];

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

    this.post = history.state;

    this.commentModelService.getCommentsByPostId(this.post.postId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( (data) => {
        this.comments = data;
      })

  
    this.userModelService.getObsListOfLikeComment()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((data:any) => {
      this.likeCommentId = data;
    })
  }

  /**
   * add new comment
   * @param comment 
   */
  addComment(comment:string) {
    if (comment) {
      this.commentModelService.createComment(this.post, comment)
    }
  }

  /**
   * delete comment
   * @param comment 
   */
  removeComment(comment: Comment) {
    this.commentModelService.removeComment(this.post, comment);
  }

  /**
   * Like or Dislike comment
   * @param commentId 
   */
  likeComment(comment: Comment) {
    this.userModelService.likeComment(comment);
  }
}
