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

  pictures: Picture[] = [];
  currentUser: User;


  constructor(
    private pictureModelService: PictureModelService,
    private userModelService: UserModelService,
    public router: Router ) {
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
  }

  /**
   * Create new Picture
   */
  addPicture() {
    this.pictureModelService.createPicture({
      pictureUrl: "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg"
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
  goToComment(pictureId: any) {
    this.router.navigate(['comments',pictureId]);
  }

  /**
   * Like or dislike picture
   * @param pictureId 
   */
  likePicture(picture: Picture) {
    this.userModelService.likePicture(picture);
  }

  /**
   * Picture is like or not
   * @param pictureId 
   * @returns boolean
   */
  pictureIsLike(pictureId: number): boolean {
    return this.userModelService.isLikePicture(pictureId)
  }
}
