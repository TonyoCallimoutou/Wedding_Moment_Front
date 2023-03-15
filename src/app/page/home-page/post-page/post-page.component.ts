import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';

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

  public listViewSelected: boolean = true;
  public isDialogOpen : boolean = false;
  public postDetail: any;

  @ViewChild('dialog') dialog: ElementRef | undefined;


  constructor(
    private postModelService: PostModelService,
    private renderer: Renderer2,
  ) {
    this.renderer.listen('window', 'click',(e:Event)=>{
      if (this.isDialogOpen) {
        if(!this.dialog?.nativeElement.contains(e.target)){
          this.isDialogOpen = false;
          this.postDetail = null;
        }
      }
      else if (this.postDetail) {
        this.isDialogOpen = true;
      }
    });
  }

  public isBigImage(index : number) {
    return index % 10 === 3 || index % 10 === 9;
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

  public openDialog(post: Post) {
    this.postDetail = post;
  }

}
