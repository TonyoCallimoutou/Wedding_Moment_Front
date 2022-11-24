import { Injectable, OnDestroy } from '@angular/core';
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

    private listOfPicture: Picture[] = [];
    private listOfPictureObs$: Subject<Picture[]> = new Subject<Picture[]>;


    constructor(
        private userModelService: UserModelService,
        public pictureService: PictureService,
        private socketService: SocketIoService,
    ) {
        this.userData = this.userModelService.getCurrentUser();

        this.initList();

        this.initListeningFromSocket();
    }
    
    initList() {
        this.pictureService.getAll().subscribe((data:any) => {
            this.listOfPicture = data;
            this.listOfPictureObs$.next(data);
        });
    }

    initListeningFromSocket() {

        this.socketService.socket.on('listeningAddPicture', (picture: any) => {
            this.listOfPicture.push(picture);
            this.listOfPictureObs$.next(this.listOfPicture);
        });

        this.socketService.socket.on('ListeningRemovePicture', (picture: any) => {
            this.listOfPicture = this.listOfPicture.filter(item => item.pictureId !== picture.pictureId);
            this.listOfPictureObs$.next(this.listOfPicture);
        });

        this.socketService.socket.on('ListeningSetPicture', (picture: any) => {
            this.listOfPicture.forEach((item, i) => { 
                if (item.pictureId == picture.pictureId) {
                    this.listOfPicture[i] = picture; 
                }
            });
            this.listOfPictureObs$.next(this.listOfPicture);
        });
    }
    
    // Create Picture
    createPicture(data: any) {
        const picture = {   
            pictureUrl: data.pictureUrl,
            countLike: 0,
            countComment: 0,
            userId: this.userData.userId,
            userName: this.userData.userName,
            photoUrl: this.userData.photoUrl
        }
        this.pictureService.create(picture)
        .subscribe( data => {
            this.socketService.addPicture(data);
        })
    }

    // Get All Picture
    getAll() {
        console.log(this.listOfPicture)
        return this.listOfPictureObs$;
    }

    // Remove Picture
    removePicture(picture: Picture) {
        if (picture.userId == this.userData.userId) {
            this.pictureService.delete(picture.pictureId!)
            .subscribe( data => {
                this.socketService.removePicture(picture);
            })
        }
    }
}