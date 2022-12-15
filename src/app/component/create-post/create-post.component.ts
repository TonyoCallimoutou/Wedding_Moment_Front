import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, take } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Output() createPostEvent: EventEmitter<string> = new EventEmitter<string>();
  
  public uploadProgress: Observable<number | undefined> = new Observable<number | undefined>();
  public downloadURL: string = ""

  private basePath = '/uploads';

  public editMode: boolean = false;

  
  


  constructor(
    private afStorage: AngularFireStorage
    ) { }

  ngOnInit(): void {
  }

  // fonction pour télécharger le fichier 
  upload(event: any) { 
    
    const fileUpload = event.target.files[0];

    console.log(fileUpload);

    const filePath = `${this.basePath}/${fileUpload.name}`;
    const storageRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, fileUpload);
  
    console.log("ok")
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL()
        .subscribe(url => {
          console.log(url)
          this.downloadURL = url;
          this.editMode = true;
        })
      })
    ).subscribe();

  }

  create() {
    this.editMode = false;
    this.createPostEvent.emit(this.downloadURL);
  }
  

}
