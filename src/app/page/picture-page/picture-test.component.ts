import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Picture } from 'src/app/model/picture.model';
import { AuthService } from 'src/app/service/auth.service';
import { PictureService } from 'src/app/service/picture.service';

@Component({
  selector: 'app-picture-test',
  templateUrl: './picture-test.component.html',
  styleUrls: ['./picture-test.component.scss']
})
export class PictureTestComponent implements OnInit {

  pictures: Picture[] = [];

  constructor(
    private authService: AuthService,
    private pictureService: PictureService,
    public router: Router ) {
    }

  ngOnInit() {
    this.initPictures()
  }

  /**
   * init list of picture
   */
  initPictures() {
    this.pictureService.getAll()
    .subscribe( (data) => {
      this.pictures = data;
    })
  }

  /**
   * Create new Picture
   */
  addPicture() {
    this.authService.createPicture({
      pictureUrl: "testUrl"
    })
  }

  /**
   * Delete Picture
   * @param pictureId 
   */
  removePicture(pictureId: any) {
    this.authService.removePicture(pictureId);
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
  likePicture(pictureId: any) {
    this.authService.likePicture(pictureId);
  }
}
