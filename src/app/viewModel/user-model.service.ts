import { Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';
import { User } from '../model/user.model';
import { SocketIoService } from '../service/socket-io.service';
import { UserService } from '../service/user.service';
import { CommentModelService } from './comment-model.service';
import { PictureModelService } from './picture-model.service';


@Injectable({
    providedIn: 'root',
  })
export class UserModelService {

    public userData: any;
    private listLikeCommentId : number[] = [];
    private listLikePictureId : number[] = [];

    constructor(
        private userService: UserService,
        private socketService: SocketIoService
    ) {
        this.setUserData();
        this.getListOfLikePictureId();
        this.getListOfLikeCommentId();
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    CreateUser(user: any) {
        this.userData = new User(
            user.displayName,
            user.email,
            user.emailVerified,
            user.photoURL,
            user.uid
        );

        this.userService.create(this.userData)
            .subscribe( data => {   
                console.log(data);
            });

        this.getListOfLikePictureId();
        this.getListOfLikeCommentId();
    }

    setUserData() {
        this.userData = this.getCurrentUser();
    }


    // Return Current User
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }

    //Remove User
    removeUser() {
        this.userService.delete(this.userData.userId)
    }

    /**
     * Comment
     */

    // Return List Of Like CommentId
    getListOfLikeCommentId() {
        this.userService.getlikeComment(this.userData.userId)
        .subscribe( data => {
            this.listLikeCommentId = [];
            data.forEach((data : any) => {
                this.listLikeCommentId.push(data.commentId);
            });
        });
    }
    
    // Like Or Dislike Comment
    likeComment(comment: Comment) {
        var data = {
            userId : this.userData.userId,
            commentId : comment.commentId
        }

        if (this.listLikeCommentId.includes(comment.commentId)) {
            this.userService.dislikeComment(data)
            .subscribe( data => {
                this.socketService.refreshListComment(comment.pictureId);
                this.listLikeCommentId = this.listLikeCommentId.filter((item:number) => item !== comment.commentId);
            })
        }
        else {
            this.userService.likeComment(data)
            .subscribe( data => {
                this.socketService.refreshListComment(comment.pictureId);
                this.listLikeCommentId.push(comment.commentId);
            })
        }
    }

    /**
     * Picture
     */
        
    // Return List Of Like PictureId
    getListOfLikePictureId() {
        this.userService.getlikePicture(this.userData.userId)
        .subscribe( data => {
            this.listLikePictureId = [];
            data.forEach((data : any) => {
                this.listLikePictureId.push(data.pictureId);
            });
        });
    }

    // Like Or Dislike Picture
    likePicture(pictureId: number) {
        var data = {
            userId : this.userData.userId,
            pictureId : pictureId
        }

        if (this.listLikePictureId.includes(pictureId)) {
            this.userService.dislikePicture(data)
            .subscribe( data => {
                this.socketService.refreshListPicture();
                this.listLikePictureId = this.listLikePictureId.filter((item:number) => item !== pictureId);
            })
        }
        else {
            this.userService.likePicture(data)
            .subscribe( data => {
                this.socketService.refreshListPicture();
                this.listLikePictureId.push(pictureId);
            })
        }
    }

}