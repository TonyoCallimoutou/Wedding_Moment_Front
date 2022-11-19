import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { CommentService } from './comment.service';
import { PictureService } from './picture.service';
import { Comment } from '../model/comment.model';
import { Picture } from '../model/picture.model';
import { UserUtils } from '../utils/user.utils';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    userData: any;
    listLikePictureId : number[] = [];
    listLikeCommentId : number[] = [];

    constructor(
        public userService: UserService,
        public commentService: CommentService,
        public pictureService: PictureService,
        public afAuth: AngularFireAuth,
        public router: Router,
    ) { 
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((user) => {
            if (user) {
            this.userData = UserUtils.createUserFromFirebase(user);
            this.getListOfLikePictureId();
            this.getListOfLikeCommentId();

            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user')!);
            } else {
            localStorage.setItem('user', 'null');
            JSON.parse(localStorage.getItem('user')!);
            }
        });
    }

    // Sign in with email/password
    SignIn(email: string, password: string) {
        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                this.afAuth.authState.subscribe((user) => {
                    if (user) {
                        this.router.navigate(['dashboard']);
                    }
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    // Sign up with email/password
    SignUp(email: string, password: string) {
        return this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
                this.SendVerificationMail();
                this.SetUserData(result.user);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['verify-email-address']);
            });
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
            //this.router.navigate(['dashboard']);
      });
    }

    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.router.navigate(['dashboard']);
                this.SetUserData(result.user);
            })
            .catch((error) => {
                window.alert(error);
            });
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            // Remove User
            this.router.navigate(['sign-in']);
        });
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user: any) {
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


    // Return Current User
     getCurrentUser() {
        if (this.isLoggedIn) {
            return JSON.parse(localStorage.getItem('user')!);
        }
    }

    //Remove User
    removeUser() {
        this.userService.delete(this.userData.userId)
    }

    /**
     * COMMENT
     */

    // Create Comment
    createComment(pictureId: number, comment: string) {
        const data = {
            pictureId: pictureId,
            userId: this.userData.userId,
            comment: comment
        }
        this.commentService.create(data)
        .subscribe( data => {
          console.log(data);
        })
    }

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
    likeComment(commentId: number) {
        var data = {
            userId : this.userData.userId,
            commentId : commentId
        }

        if (this.listLikeCommentId.includes(commentId)) {
            this.userService.dislikeComment(data)
            .subscribe( data => {
                console.log(data)
                this.listLikeCommentId = this.listLikeCommentId.filter((item:number) => item !== commentId);
            })
        }
        else {
            this.userService.likeComment(data)
            .subscribe( data => {
                console.log(data)
                this.listLikeCommentId.push(commentId);
            })
        }
    }

    // Remove Comment
    removeComment(comment: Comment) {
        if (comment.userId == this.userData.userId) {
            this.commentService.delete(comment.commentId!)
            .subscribe( data => {
              console.log(data);
            })
        }
    }

    
    /**
     * PICTURE
     */

    // Create Picture
    createPicture(data: any) {
        const picture = {
            userId: this.userData.userId,
            pictureUrl: data.pictureUrl
        }
        this.pictureService.create(picture)
        .subscribe( data => {
          console.log(data);
        })
    }

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
                console.log(data)
                this.listLikePictureId = this.listLikePictureId.filter((item:number) => item !== pictureId);
            })
        }
        else {
            this.userService.likePicture(data)
            .subscribe( data => {
                console.log(data)
                this.listLikePictureId.push(pictureId);
            })
        }
    }

    // Remove Picture
    removePicture(picture: Picture) {
        if (picture.userId == this.userData.userId) {
            this.pictureService.delete(picture.pictureId!)
            .subscribe( data => {
              console.log(data);
            })
        }
    }
}