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

  public listViewSelected: boolean = true;

  public switchOptions: OptionStringIcon[];

  public postDetail: any = null;

  public pictureSrc : any;

  private pictureCropped: any;

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  @ViewChild('dialogAddPost') dialogAddPost!: TemplateRef<any>;


  constructor(
    private postModelService: PostModelService,
    private dialog: MatDialog,
  ) {

    const optionOne : OptionStringIcon = {
      optionText: "Posts.list",
      icon: "list",
    }
    const optionTwo : OptionStringIcon = {
      optionText: "Posts.grid",
      icon: "grid_on",
    }

    this.switchOptions = [optionOne, optionTwo];
  }

  /**
   * determine if picture is Big or not
   * @param index
   * return boolean
   */
  public isBigImage(index : number): boolean {
    return index % 10 === 3 || index % 10 === 9;
  }

  /**
   * Create new Post
   */
  choosePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png,.jpg';
    fileInput.addEventListener('change', (event: any) => {
      this.openDialogAddPost(event);
    });
    fileInput.click();
  }


  /**
   * Open Dialog to add post
   * @param event
   */
  openDialogAddPost(event: any) {
    this.pictureSrc = event;

    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogAddPost },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postModelService.createPost(this.pictureCropped);
      }
    });
  }

  /**
   * Image crope in the dialog
   * @param picture
   */
  getCroppedImage(picture : any) {
    this.pictureCropped = picture;
  }

  /**
   * remove post
   * @param post
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

  /**
   * Open dialog of detail post (in grid view)
   * @param post
   */
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
