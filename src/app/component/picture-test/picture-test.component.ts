import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/model/picture.model';
import { PictureService } from 'src/app/service/picture.service';

@Component({
  selector: 'app-picture-test',
  templateUrl: './picture-test.component.html',
  styleUrls: ['./picture-test.component.scss']
})
export class PictureTestComponent implements OnInit {

  pictures: Picture[] = [];

  constructor(
    private pictureService: PictureService) {
    }

  ngOnInit() {
    this.pictureService.getAll()
    .subscribe( (data) => {
      this.pictures = data;
    })
  }

  addPicture() {
    this.pictureService.create(new Picture(2,"testPicture"))
    .subscribe( data => {
      this.ngOnInit
      console.log(data);
    })
  }

  removePicture() {
    this.pictureService.delete(1)
    .subscribe( data => {
      console.log(data);
    })
  }
}
