import {Injectable} from '@angular/core';
import {EventService} from '../service/event.service';
import {FirebaseStorageService} from '../service/firebaseStorage.service';
import {UserModelService} from './user-model.service';


@Injectable({
  providedIn: 'root',
})
export class StorageModelService {

  private basePathPost: string;

  constructor(
    private eventService: EventService,
    private storageService: FirebaseStorageService,
    private userModelService: UserModelService,
  ) {
    this.basePathPost = "/event/" + this.eventService.getEventId();
  }

  public UploadPictureAndGetUrl(postId: number, fileUpload: any): Promise<string> {

    return new Promise(resolve => {
      const user = this.userModelService.getCurrentUser();

      let filePath = (`${this.basePathPost}/${user.userId}/${postId}`);

      this.storageService.uploadPictureAndGetUrl(fileUpload, filePath).then(url => {
        resolve(url)
      })
    });
  }

  public deletePictureFromStorage(downloadUrl: string) {
    this.storageService.deletePictureFromStorage(downloadUrl);
  }
}
