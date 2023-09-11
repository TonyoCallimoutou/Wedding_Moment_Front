import {Component, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {CookieHelper} from "../../../shared/service/cookie.helper";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {TranslateService} from "@ngx-translate/core";
import {LoaderService} from "../../../shared/service/loader.service";
import {Post} from "../../../model/post.model";
import {LocalModel} from "../../../model/local.model";
import {User} from "../../../model/user.model";


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent {

  @Input() public canAccess: boolean = false;
  @Input() public isActivate: boolean = false;
  @Input() public currentUser!: User;
  @Input() public posts: Post[] = [];
  @Input() public postsOffline: Post[] = [];
  @Input() public postsGridView: Post[] = [];
  @Input() public reactPostId: number[] = [];
  @Output() public switchTab: EventEmitter<number> = new EventEmitter<number>();
  @Input() public isEditMode: boolean = false;
  @Output() public takePicture: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public reportPost: EventEmitter<Post> = new EventEmitter<Post>();

  public tabSelector: number = 0;

  isMorePost: boolean = true;

  public listViewSelected: boolean = true;
  public postDetail: any = null;

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureDeletePost') dialogAreYouSureDeletePost!: TemplateRef<any>;


  constructor(
    private postModelService: PostModelService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackbarService: SnackbarService,
    private loaderService: LoaderService
  ) {
  }

  /**
   * Function call when user change step
   * @param tabulation
   */
  tab(tabulation: number) {
    this.tabSelector = tabulation;
    CookieHelper.set(LocalModel.TAB, String(this.tabSelector));
  }

  goToTakePicture() {
    this.takePicture.emit(true);
  }

  /**
   * remove post
   * @param post
   */
  public removePost(post: Post) {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {contentTemplate: this.dialogAreYouSureDeletePost},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postModelService.removePost(post);
      }
    });
  }

  /**
   * Like or dislike post
   * @param post
   */
  public reactPost(post: Post) {
    this.postModelService.reactPost(post);
  }

  public reportedPost(post: Post) {
    this.reportPost.emit(post);
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
        isDisplayButton: false
      }
    });
  }

  getMorePost() {
    if(this.isMorePost) {
      this.loaderService.setLoader(true);
      this.postModelService.getMorePost(this.posts[this.posts.length - 1].publicationDate).then((isMorePost) => {
        this.isMorePost = isMorePost;
        this.loaderService.setLoader(false);
      });
    }
  }

  public updateOnline(post: Post) {
    post.isDownloading = true;
    this.postModelService.updatePostWithFirebase(post).then(() => {
      post.isDownloading = false;
      this.postsOffline = this.postsOffline.filter((postOffline) => postOffline.postId !== post.postId);
      if (this.postsOffline.length === 0) {
        this.tabSelector = 0;
      }
    }).catch((error) => {
      post.isDownloading = false;
      this.translate.get('Posts.Error.update-post').subscribe((res: string) => {
        this.snackbarService.showSnackbar("error", res);
      });
      console.log(error);
    });
  }

  public goToUserPage() {
    this.switchTab.emit(4);
  }

}
