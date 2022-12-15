import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Picture } from 'src/app/model/picture.model';
import { User } from 'src/app/model/user.model';
import { PictureModelService } from 'src/app/viewModel/picture-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture-page.component.html',
  styleUrls: ['./picture-page.component.scss']
})
export class PicturePageComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  public pictures: Picture[] = [];
  public likePictureId: number[] = [];
  public currentUser: User;


  constructor(
    private pictureModelService: PictureModelService,
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
   * init list of picture
   */
  initData() {

    this.pictureModelService.getAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.pictures = data;
      })

    this.userModelService.getObsListOfLikePicture()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data:any) => {
        this.likePictureId = data;
      })
  }

  /**
   * Create new Picture
   */
  addPicture(pictureUrl: string) {
    this.pictureModelService.createPicture({
      pictureUrl: pictureUrl
    })
  }



  /**
   * Delete Picture
   * @param pictureId 
   */
  removePicture(picture: Picture) {
    this.pictureModelService.removePicture(picture);
  }

  /**
   * Go to Comment zone
   * @param pictureId 
   */
  goToComment(picture: any) {
    this.router.navigateByUrl('/comments', { state: picture });
  }

  /**
   * Like or dislike picture
   * @param pictureId 
   */
  likePicture(picture: Picture) {
    this.userModelService.likePicture(picture);
  }

}
