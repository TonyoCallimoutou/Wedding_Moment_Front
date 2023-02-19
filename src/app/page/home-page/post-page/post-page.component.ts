import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/model/post.model';
import { User } from 'src/app/model/user.model';
import { PostModelService } from 'src/app/viewModel/post-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  @Input() public canAccess: boolean = false;
  @Input() public currentUser! : User;
  @Input() public posts: Post[] = [];
  @Input() public reactPostId: number[] = [];


  constructor(
    private postModelService: PostModelService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  /**
   * Create new Post
   */
  public addPost(data :any) {
    this.postModelService.createPost(data.downloadURL);
  }



  /**
   * Delete Post
   * @param postId
   */
  public removePost(post: Post) {
    this.postModelService.removePost(post);
  }

  /**
   * Like or dislike post
   * @param postId
   */
  public reactPost(post: Post) {
    this.postModelService.reactPost(post);
  }

}
