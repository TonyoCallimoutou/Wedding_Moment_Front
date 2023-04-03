import {Component, EventEmitter, Input, Output} from '@angular/core';
import {base64ToFile, ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-generic-image-cropper',
  templateUrl: './generic-image-cropper.component.html',
  styleUrls: ['./generic-image-cropper.component.scss']
})
export class GenericImageCropperComponent {

  @Input() maintainAspectRatio : boolean = false;
  @Input() imageChangedEvent : any = '';
  @Input() ratio : number = 4/3;
  @Output() croppedImage: EventEmitter<any> = new EventEmitter<any>();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage.emit(event.base64);
  }
}
