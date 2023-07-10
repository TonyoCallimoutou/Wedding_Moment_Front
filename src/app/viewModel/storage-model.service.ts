import {Injectable} from '@angular/core';
import {EventService} from '../service/event.service';
import {FirebaseStorageService} from '../service/firebaseStorage.service';
import {base64ToFile} from "ngx-image-cropper";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class StorageModelService {

  private basePathPost: string;
  private basePathUser: string;

  constructor(
    private eventService: EventService,
    private storageService: FirebaseStorageService,
  ) {
    this.basePathPost = "/event";
    this.basePathUser = "/users";
  }

  public uploadPictureAndGetUrl(userId: string, postId: number, fileUpload: any): Promise<string> {
    let eventId = this.eventService.getEventId();

    return new Promise(resolve => {

      try {
        fileUpload = base64ToFile(fileUpload);
      }
      catch (e) {
        console.log(e);
      }

      let filePath = (`${this.basePathPost}/${eventId}/${userId}/${postId}`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public uploadUserPictureAndGetUrl(userId: string, fileUpload: any): Promise<string> {

    return new Promise(resolve => {

      try {
        fileUpload = base64ToFile(fileUpload);
      }
      catch (e) {
        console.log(e);
      }

      let filePath = (`${this.basePathUser}/${userId}`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public uploadEventPictureAndGetUrl(fileUpload: any): Promise<string> {
    let eventId = this.eventService.getEventId();

    return new Promise(resolve => {

      fileUpload = base64ToFile(fileUpload.picture);

      let filePath = (`${this.basePathPost}/${eventId}/fond`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public exportPicture(): Observable<number> {
    let eventId = this.eventService.getEventId();

    let filePath = (`${this.basePathPost}/${eventId}`);

    this.storageService.downloadImagesAsZip(filePath);

    return this.storageService.progress$;
  }

  public deletePictureFromStorage(downloadUrl: string) {
    this.storageService.deletePictureFromStorage(downloadUrl);
  }
}
