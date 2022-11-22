import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Picture } from 'src/app/model/picture.model';
import { AuthService } from 'src/app/service/auth.service';
import { PictureService } from 'src/app/service/picture.service';
import { PictureModelService } from 'src/app/viewModel/picture-model.service';
import { UserModelService } from 'src/app/viewModel/user-model.service';

@Component({
  selector: 'app-picture-test',
  templateUrl: './picture-test.component.html',
  styleUrls: ['./picture-test.component.scss']
})
export class PictureTestComponent implements OnInit, OnDestroy {
  onDestroy$: Subject<boolean> = new Subject<boolean>();

  pictures: Picture[] = [];

  constructor(
    private pictureModelService: PictureModelService,
    private userModelService: UserModelService,
    public router: Router ) {
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
  removePicture(pictureId: any) {
    this.pictureModelService.removePicture(pictureId);
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
  likePicture(pictureId: number) {
    this.userModelService.likePicture(pictureId);
  }

  pictureIsLike(pictureId: number): boolean {
    console.log("pictureId",this.userModelService.isLikePicture(pictureId));
    return this.userModelService.isLikePicture(pictureId)
  }
}
