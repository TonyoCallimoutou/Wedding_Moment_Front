import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {PostModelService} from 'src/app/viewModel/post-model.service';
import {MatDialog} from "@angular/material/dialog";
import {GenericDialogComponent} from "../../../shared/component/generic-dialog/generic-dialog.component";


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnChanges{

  @Input() public canAccess: boolean = false;
  @Input() public currentUser!: User;
  @Input() public posts: Post[] = [];
  @Input() public reactPostId: number[] = [];
  @Output() public switchTab: EventEmitter<number> = new EventEmitter<number>();

  public postsGridView: Post[] = [];

  public listViewSelected: boolean = true;

  public switchOptions: OptionStringIcon[];

  public postDetail: any = null;

  public pictureSrc : any;

  private pictureCropped: any;
  private pictureRatio: number = 1;

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['posts'] && changes['posts'].currentValue.length !== this.postsGridView.length) {
      this.postsGridView = [];
      this.arrangeImages();
    }
  }

  arrangeImages() {

    let positionRow = 0; // Row
    let positionColumns = 0; // Columns 0 to 2
    let grid: number[][] = [[0,0,0]]; // Grille

    this.posts.forEach((value, index) => {

      while (true) {

        if (positionColumns == 3) {
          // New Row
          positionRow++;
          positionColumns = 0;
        }
        if (!grid[positionRow]) {
          grid.push([0, 0, 0]);
        }
        if (!grid[positionRow + 1]) {
          grid.push([0, 0, 0]);
        }

        // Landscape
        if (value.pictureRatio === 2) {
          if (grid[positionRow][positionColumns] == 0 && grid[positionRow][positionColumns + 1] == 0) {
            this.postsGridView.push(value);

            grid[positionRow][positionColumns] = index +1;
            positionColumns++;
            grid[positionRow][positionColumns] = index +1;
            break;
          }
        }
        // Portrait
        else if (value.pictureRatio === 0.5) {
          if (grid[positionRow][positionColumns] == 0 && grid[positionRow + 1][positionColumns] == 0) {
            this.postsGridView.push(value);

            grid[positionRow][positionColumns] = index +1;
            grid[positionRow + 1][positionColumns] = index +1;
            break;
          }
        }
        // Square
        else {

          let indexSquare;
          for (let indexRow = 0; indexRow < grid.length; indexRow++) {
            for (let indexColumns = 0; indexColumns <grid[indexRow].length; indexColumns++) {
              // Trouver une place libre
              if (grid[indexRow][indexColumns] === 0 ) {
                indexSquare = 0;
                // Comparer avec la ligne au dessus
                if (indexRow-1 >= 0) {
                  indexSquare = Math.max(...grid[indexRow - 1])
                }
                if (indexColumns === 1) {
                  indexSquare = Math.max(indexSquare, grid[indexRow][0]);
                }
                if (indexColumns === 2) {
                  indexSquare = Math.max(indexSquare, grid[indexRow][0], grid[indexRow][1]);
                }

                grid[indexRow][indexColumns] = index +1;
                this.postsGridView.splice(indexSquare, 0, value);

                // Replacer le curseur pour les image suivantes
                if( indexRow !== positionRow && indexColumns !== positionColumns) {
                  positionColumns--;
                }
                break;
              }
            }

            if (indexSquare != undefined) {
              break;
            }
          }
          break;
        }

        positionColumns++;
      }

      // Prochaine image
      positionColumns ++ ;
      if (positionColumns == 3) {
        // New Row
        positionRow++;
        positionColumns = 0;
      }
      if(!grid[positionRow]) {
        grid.push([0,0,0]);
      }
    })
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
        this.postModelService.createPost(this.pictureCropped,this.pictureRatio );
      }
    });
  }

  /**
   * Image crope in the dialog
   * @param picture
   */
  getCroppedImage(data : any) {
    this.pictureCropped = data.picture;
    this.pictureRatio = data.ratio;
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

  public goToUserPage() {
    this.switchTab.emit(4);
  }

}
