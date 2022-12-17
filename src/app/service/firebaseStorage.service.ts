import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FirebaseStorageService {

    constructor(
        private afStorage: AngularFireStorage
    ) {}

    public uploadPictureAndGetUrl(fileUpload: any, filePath: string): Promise<string> {
        
        return new Promise(resolve => {

            const storageRef = this.afStorage.ref(filePath);
        
            const uploadTask = this.afStorage.upload(filePath, fileUpload);
        
            uploadTask
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        storageRef.getDownloadURL()
                        .subscribe(url => {
                        resolve(url);
                        })
                    })
                ).subscribe();

        });

    }

    public deletePictureFromStorage(downloadUrl: string) {
        this.afStorage.storage.refFromURL(downloadUrl).delete();
      }



}