import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Comment } from '../model/comment.model';
import { Picture } from '../model/picture.model';
import { User } from '../model/user.model';
import { SocketIoService } from '../service/socket-io.service';
import { UserService } from '../service/user.service';


@Injectable({
    providedIn: 'root',
  })
export class UserModelService {

    public userData: any;

    private listLikeCommentId : number[] = [];
    private listLikePictureId : number[] = [];

    private listLikeCommentIdObs$ : BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private listLikePictureIdObs$ : BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor(
        private userService: UserService,
        private socketService: SocketIoService
    ) {
        this.setUserData();
        if (this.userData != null) {
            this.getListOfLikePictureId();
            this.getListOfLikeCommentId();
        }
    }

    // Get User from Databas
    getUserFromDB(userId : string): Observable<User> {
        return this.userService.getUserById(userId);
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    CreateUser(user: any): Observable<any> {
        this.userData = new User(
            user.displayName,
            user.email,
            user.emailVerified,
            user.photoURL,
            user.uid
        );

        this.getListOfLikePictureId();
        this.getListOfLikeCommentId();

        return this.userService.create(this.userData)
    }

    setUserData() {
        this.userData = this.getCurrentUser();
    }


    // Return Current User
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }

    // SET USER

    setPhotoUrl(url: string) {
        const data = {
            userId: this.userData.userId,
            photoUrl: url
        }
        this.userService.setPhotoUrl(data)
            .pipe(take(1))
            .subscribe((data: any) => {
                console.log(data)
                this.userData.photoUrl = url;
                localStorage.setItem('user', JSON.stringify(this.userData));
            });
    }

    //Remove User
    removeUser(): Observable<any> {
        return this.userService.delete(this.userData.userId)
    }

    /**
     * Comment
     */

    // Return List Of Like CommentId
    getListOfLikeCommentId() {
        this.userService.getlikeComment(this.userData.userId)
            .pipe(take(1))
            .subscribe( data => {
                this.listLikeCommentId = [];
                data.forEach((data : any) => {
                    this.listLikeCommentId.push(data.commentId);
                });
            });
    }

    // return true if comment is in list of like picture
    isLikeComment(commentId: number) {
        return this.listLikeCommentId.includes(commentId);
    }
    
    // Like Or Dislike Comment
    likeComment(comment: Comment) {
        var data = {
            userId : this.userData.userId,
            commentId : comment.commentId
        }

        if (this.listLikeCommentId.includes(comment.commentId)) {
            this.userService.dislikeComment(data)
                .pipe(take(1))
                .subscribe( data => {
                    comment.countLikeComment --;
                    this.listLikeCommentId = this.listLikeCommentId.filter((item:number) => item !== comment.commentId);
                    this.socketService.setComment(comment);
                })
        }
        else {
            this.userService.likeComment(data)
                .pipe(take(1))
                .subscribe( data => {
                    comment.countLikeComment ++;
                    this.listLikeCommentId.push(comment.commentId);
                    this.socketService.setComment(comment);
                })
        }
    }

    /**
     * Picture
     */
        
    // Return List Of Like PictureId
    getListOfLikePictureId() {
        this.userService.getlikePicture(this.userData.userId)
            .pipe(take(1))
            .subscribe( data => {
                this.listLikePictureId = [];
                data.forEach((data : any) => {
                    this.listLikePictureId.push(data.pictureId);
                });

                this.listLikePictureIdObs$.next(this.listLikePictureId);
            });
    }

    // return tru if picture is in list of like picture
    // isLikePicture(pictureId: number): boolean {
    //     return this.listLikePictureId.includes(pictureId);
    // }

    // // Return if picture is like by user or not
    // pictureIsLike(pictureId: number) : boolean {
    //     return this.listLikePictureId.includes(pictureId);
    // }

    getObsListOfLikePicture():Observable<any> {
        return this.listLikePictureIdObs$;
    }

    // Like Or Dislike Picture
    likePicture(picture: Picture) {
        var data = {
            userId : this.userData.userId,
            pictureId : picture.pictureId
        }

        if (this.listLikePictureId.includes(picture.pictureId)) {
            this.userService.dislikePicture(data)
                .pipe(take(1))
                .subscribe( data => {
                    picture.countLike --;
                    this.listLikePictureId = this.listLikePictureId.filter((item:number) => item !== picture.pictureId);
                    this.listLikePictureIdObs$.next(this.listLikePictureId);
                    this.socketService.setPicture(picture);
                })
        }
        else {
            this.userService.likePicture(data)
                .pipe(take(1))
                .subscribe( data => {
                    picture.countLike ++;
                    this.listLikePictureId.push(picture.pictureId);
                    this.listLikePictureIdObs$.next(this.listLikePictureId);
                    this.socketService.setPicture(picture);
                })
        }
    }

}