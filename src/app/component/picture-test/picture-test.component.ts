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
      this.ngOnInit()
    }

  ngOnInit() {
    this.pictureService.getAll()
    .subscribe( (data) => {
      this.pictures = data;
    })
  }

}
