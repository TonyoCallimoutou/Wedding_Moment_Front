import { Component, OnDestroy, OnInit } from '@angular/core';
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

  public posts: Post[] = [];
  public likePostId: number[] = [];
  public currentUser: User;


  constructor(
    private postModelService: PostModelService,
    private userModelService: UserModelService,
    private router: Router ) {
      this.currentUser = userModelService.getCurrentUser()
    }

  ngOnInit(): void {
    this.initData()
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }

  /**
   * init list of post
   */
  private initData() {

    this.postModelService.getAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.posts = data;
      })

    this.userModelService.getObsListOfLikePost()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.likePostId = data;
      })
  }

  /**
   * Create new Post
   */
  public addPost(data :any) {
    this.postModelService.createPost({
      pictureUrl: data.downloadURL,
      categorieId: 4,
    })
  }



  /**
   * Delete Post
   * @param postId 
   */
  public removePost(post: Post) {
    this.postModelService.removePost(post);
  }

  /**
   * Go to Comment zone
   * @param postId 
   */
  public goToComment(post: any) {
    this.router.navigateByUrl('/comments', { state: post });
  }

  /**
   * Like or dislike post
   * @param postId 
   */
  public likePost(post: Post) {
    this.userModelService.likePost(post);
  }

}
