import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";
import {SnackbarService} from "../../../shared/service/snackbar.service";
import {OptionStringIcon} from 'src/app/model/option-string-icon.model';


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
  @Input() public postsGridView: Post[] = [];
  @Input() public reactPostId: number[] = [];
  @Output() public switchTab: EventEmitter<number> = new EventEmitter<number>();
  @Input() public isEditMode: boolean = false;
  @Output() public afficherTabGroup: EventEmitter<boolean> = new EventEmitter<boolean>();

  public listViewSelected: boolean = true;

  public switchOptions: OptionStringIcon[];

  public postDetail: any = null;

  public pictureSrc : any;

  private pictureCropped: any;
  private pictureRatio: number = 1;
  public isTakePicture: boolean = false;

  @ViewChild('dialogContent') dialogContent!: TemplateRef<any>;
  @ViewChild('dialogAreYouSureDeletePost') dialogAreYouSureDeletePost!: TemplateRef<any>;


  constructor(
    private postModelService: PostModelService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
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

  goToTakePicture() {
    this.isTakePicture = true;
    this.afficherTabGroup.emit(false);
    this.snackbarService.showSnackbar();
  }

  returnOfGeneratePicture(event: boolean) {
    this.isTakePicture = !event
    this.afficherTabGroup.emit(true);
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

  public goToUserPage() {
    this.switchTab.emit(4);
  }

}
