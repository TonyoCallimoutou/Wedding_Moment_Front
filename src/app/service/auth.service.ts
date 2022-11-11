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

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
    userData: any; 
    listPictureId : number[] = [];

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
            this.userData = user;
            this.getListOfLikePictureId();

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
        const userData: User = new User(
            user.displayName,
            user.email,
            user.emailVerified,
            user.uid,
            user.photoURL
        );

        this.userService.create(userData)
            .subscribe( data => {
                console.log(data);
            });

        this.getListOfLikePictureId();
    }


    /**
     *  Methode autre que L'authentification
     */

    // Return Current User
     getCurrentUser() {
        if (this.isLoggedIn) {
            return this.userData;
        }
    }

    // Return List Of Like PictureId
    getListOfLikePictureId() {
        this.userService.getlikePicture(this.userData.uid)
        .subscribe( data => {
            this.listPictureId = [];
            data.forEach((data : any) => {
                this.listPictureId.push(data.pictureId);
            });
        });
    }

    // Like Or Dislike Picture
    likePicture(pictureId: number) {
        var data = {
            userId : this.getCurrentUser().uid,
            pictureId : pictureId
        }

        if (this.listPictureId.includes(pictureId)) {
            this.userService.dislikePicture(data)
            .subscribe( data => {
                console.log(data)
                this.listPictureId = this.listPictureId.filter((item:number) => item !== pictureId);
            })
        }
        else {
            this.userService.likePicture(data)
            .subscribe( data => {
                console.log(data)
                this.listPictureId.push(pictureId);
            })
        }
    }

    /**
     * COMMENT
     */

    // Create Comment
    createComment(pictureId: number) {
        this.commentService.create(new Comment(pictureId,this.userData.uid,"test_commment"))
        .subscribe( data => {
          console.log(data);
        })
    }

    // Remove Comment
    removeComment(comment: Comment) {
        if (comment.userId == this.userData.uid) {
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
            userId: this.userData.uid,
            pictureUrl: data.pictureUrl
        }
        this.pictureService.create(picture)
        .subscribe( data => {
          console.log(data);
        })
    }

    // Remove Picture
    removePicture(picture: Picture) {
        if (picture.userId == this.userData.uid) {
            this.pictureService.delete(picture.pictureId!)
            .subscribe( data => {
              console.log(data);
            })
        }
    }
}