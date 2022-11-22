import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Picture } from '../model/picture.model';
import { User } from '../model/user.model';
import { PictureService } from '../service/picture.service';
import { SocketIoService } from '../service/socket-io.service';
import { UserModelService } from './user-model.service';


@Injectable({
    providedIn: 'root',
  })
export class PictureModelService {

    userData: User;

    private listOfPictureObs$: Subject<Picture[]> = new Subject<Picture[]>;


    constructor(
        private userModelService: UserModelService,
        public pictureService: PictureService,
        private socketService: SocketIoService,
    ) {
        this.userData = this.userModelService.getCurrentUser();

        this.initList();

        this.socketService.socket.on('ListPictures', (data: any) => {
            this.pictureService.getAll().subscribe((data:any) => {
                this.listOfPictureObs$.next(data);
            })
          });
    }

    initList() {
        this.pictureService.getAll().subscribe((data:any) => {
            this.listOfPictureObs$.next(data);
        });
    }
    
    // Create Picture
    createPicture(data: any) {
        const picture = {   
            userId: this.userData.userId,
            pictureUrl: data.pictureUrl
        }
        this.pictureService.create(picture)
        .subscribe( data => {
            this.socketService.refreshListPicture();
        })
    }

    // Get All Picture
    getAll() {
        return this.listOfPictureObs$;
    }

    // Remove Picture
    removePicture(picture: Picture) {
        if (picture.userId == this.userData.userId) {
            this.pictureService.delete(picture.pictureId!)
            .subscribe( data => {
                this.socketService.refreshListPicture();
            })
        }
    }
}