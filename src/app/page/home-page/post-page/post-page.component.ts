import {Component, Input} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
// @ts-ignore
import {Post} from 'src/app/model/post.model';
// @ts-ignore
import {User} from 'src/app/model/user.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  @Input() public canAccess: boolean = false;
  @Input() public currentUser!: User;
  @Input() public posts: Post[] = [];
  @Input() public reactPostId: number[] = [];

  constructor(
    private postModelService: PostModelService
  ) {
  }

  /**
   * Create new Post
   */
  public addPost(data: any) {
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
