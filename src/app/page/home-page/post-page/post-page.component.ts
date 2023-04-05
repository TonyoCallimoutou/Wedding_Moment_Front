import {Component, ElementRef, Input, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";

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

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;

  public listViewSelected: boolean = true;

  public postDetail: any = null;


  constructor(
    private postModelService: PostModelService,
    private dialog: MatDialog,
  ) {
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
    this.dialog.open(GenericDialogComponent, {
      data: {
        contentTemplate: this.dialogContent,
        isDisplayBouton: false
      }
    });
  }

}
