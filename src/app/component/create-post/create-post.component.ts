import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Output() createPostEvent: EventEmitter<any> = new EventEmitter<any>();

  public downloadURL: string = "";

  public editMode: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  // fonction pour télécharger le fichier
  upload(event: any) {

    const fileUpload = event.target.files[0];
    this.downloadURL = fileUpload;
    this.editMode = true;
  }

  create() {
    this.editMode = false;
    this.createPostEvent.emit({
      downloadURL: this.downloadURL
    });
  }


}
