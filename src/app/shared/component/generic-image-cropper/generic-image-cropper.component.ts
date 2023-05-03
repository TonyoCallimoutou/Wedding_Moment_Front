import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-generic-image-cropper',
  templateUrl: './generic-image-cropper.component.html',
  styleUrls: ['./generic-image-cropper.component.scss']
})
export class GenericImageCropperComponent {

  @Input() maintainAspectRatio : boolean = false;
  @Input() imageChangedEvent : any = '';
  @Input() ratio : number = 4/3;
  @Input() multiRatio: boolean = false;
  @Output() croppedImage: EventEmitter<any> = new EventEmitter<any>();

  public iconOptions : OptionStringIcon[];

  constructor() {
    if (this.multiRatio) {
      this.ratio = 1;
    }
    this.iconOptions = [{
      optionText : "carré",
      icon: "crop_square"
      },
      {
        optionText: "portrait",
        icon : "crop_portrait"
      },
      {
        optionText: "paysage",
        icon : "crop_3_2"
      }
    ]
  }

  switchRatio(icon : OptionStringIcon) {
    let index = this.iconOptions.indexOf(icon);
    console.log(index)
    switch (index) {
      case 0 :
        this.ratio = 1;
        break;
      case 1 :
        this.ratio = 1/2;
        break;
      case 2 :
        this.ratio = 2;
        break;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage.emit(event.base64);
  }
}
