import {Injectable} from '@angular/core';
import {EventService} from '../service/event.service';
import {FirebaseStorageService} from '../service/firebaseStorage.service';
import {UserModelService} from './user-model.service';


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
    this.basePathPost = "/event/" + this.eventService.getEventId();
    this.basePathUser = "/users";
  }

  public uploadPictureAndGetUrl(userId: string, postId: number, fileUpload: any): Promise<string> {

    return new Promise(resolve => {

      let filePath = (`${this.basePathPost}/${userId}/${postId}`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public uploadUserPictureAndGetUrl(userId: string, fileUpload: any): Promise<string> {

    return new Promise(resolve => {

      let filePath = (`${this.basePathUser}/${userId}`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public deletePictureFromStorage(downloadUrl: string) {
    this.storageService.deletePictureFromStorage(downloadUrl);
  }
}
