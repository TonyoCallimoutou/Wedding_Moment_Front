import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {LoaderService} from "../../service/loader.service";
import {OptionStringIcon} from "../../../model/option-string-icon.model";

@Component({
  selector: 'app-generic-image-cropper',
  templateUrl: './generic-image-cropper.component.html',
  styleUrls: ['./generic-image-cropper.component.scss']
})
export class GenericImageCropperComponent implements OnInit, OnChanges{

  @Input() maintainAspectRatio : boolean = false;
  @Input() imageChangedEvent : any;
  @Input() imageBase64 : any;
  @Input() ratio : number = 4/3;
  @Input() multiRatio: boolean = false;
  @Output() croppedImage: EventEmitter<any> = new EventEmitter<any>();

  public iconOptions : OptionStringIcon[];

  constructor(
    private loaderService: LoaderService,
  ) {
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

  ngOnInit() {
    if (this.multiRatio) {
      this.ratio = 1;
    }
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes['imageBase64'] && changes['imageBase64'].currentValue) {
      this.loaderService.setLoader(true, 500);
    }
  }

  switchRatio(icon : OptionStringIcon) {
    let index = this.iconOptions.indexOf(icon);
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
    this.croppedImage.emit({
      picture: event.base64,
      ratio : this.ratio
    });
  }

  cropperReady() {
    this.loaderService.setLoader(false);
  }
}
