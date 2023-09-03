import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {CookieHelper} from "../../../shared/service/cookie.helper";
import {LocalModel} from "../../../model/local.model";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {TranslateService} from "@ngx-translate/core";


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

  public tabSelector: number = 0;

  public listViewSelected: boolean = true;
  public postDetail: any = null;

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureDeletePost') dialogAreYouSureDeletePost!: TemplateRef<any>;


  constructor(
    private postModelService: PostModelService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackbarService: SnackbarService,
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
        isDisplayButton: false
      }
    });
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
