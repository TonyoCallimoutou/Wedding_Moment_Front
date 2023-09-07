import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Subject} from "rxjs";
import * as JSZip from "jszip";


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private progressSubject: Subject<number> = new Subject<number>();

  private timout = 10000;


  constructor(
    private afStorage: AngularFireStorage
  ) {
  }

  public uploadPictureAndGetUrl(fileUpload: any, filePath: string): Promise<string> {

    return new Promise((resolve, reject) => {

      const storageRef = this.afStorage.ref(filePath);

      const uploadTask = this.afStorage.upload(filePath, fileUpload);
      let resolved = false;
      let isTimeout = false;


      if (!navigator.onLine) {
        reject(new Error("Impossible de télécharger l'image. Vérifiez votre connexion Internet."));
        isTimeout = true;
      }

      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            if (!isTimeout) {
              resolved = true;
              storageRef.getDownloadURL()
                .subscribe(url => {
                  resolve(url);
                })
            }
          })
        ).subscribe();

      // Gérer les erreurs potentielles après un certain délai
      setTimeout(() => {
        if (!resolved) {
          reject(new Error("Impossible de télécharger l'image. Vérifiez votre connexion Internet."));
          isTimeout = true;
        }
      }, this.timout);

    });
  }

  get progress$() {
    return this.progressSubject.asObservable();
  }

  downloadImagesAsZip( filePath: string) {

    const zip = new JSZip();
    const storageRef = this.afStorage.ref(filePath);


    storageRef.listAll().subscribe((result) => {
      const totalFolder = result.prefixes.length
      let completedFolder = 0;

      result.prefixes.forEach((item) => {
        const folderPath = item.fullPath;
        const folderName = item.name;


        this.afStorage.ref(folderPath).listAll().subscribe((result) => {
          const totalFiles = result.items.length;
          let completedFiles = 0;

          result.items.forEach((item) => {

            const filePath = item.fullPath;
            const fileName = item.name;

            // Téléchargez le fichier
            this.afStorage.ref(filePath).getDownloadURL().subscribe((url) => {
              console.log('url : ', url)
              fetch(url).then((response) => {
                return response.blob();
              }).then((blob) => {
                zip.file(folderName + fileName + ".png", blob);
                completedFiles++;

                // Calcul de la progression
                const progress = Math.round((completedFiles / totalFiles) * 100);
                this.progressSubject.next(progress);


                console.log("zipFile: ", zip.file.length)
                console.log("complete file: ", completedFiles);

                if (completedFiles === totalFiles) {

                  completedFolder++;

                  if (completedFolder === totalFolder) {

                    // Générez le contenu du fichier ZIP
                    zip.generateAsync({type: 'blob'}).then((content) => {

                      // Téléchargez le fichier ZIP
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(content);
                      link.download = 'images.zip';
                      link.click();

                      this.progressSubject.next(100);
                      this.progressSubject.complete();

                    }).catch((error) => {
                      this.progressSubject.error(error);
                    });
                  }
                }
              });
            });
          });
        })
      });
    });
  }

  public deletePictureFromStorage(downloadUrl: string) : Promise<any> {
    return this.afStorage.storage.refFromURL(downloadUrl).delete();
  }


}
