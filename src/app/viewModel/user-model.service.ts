import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Comment } from '../model/comment.model';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { SocketIoService } from '../service/socket-io.service';
import { UserService } from '../service/user.service';


@Injectable({
    providedIn: 'root',
  })
export class UserModelService {

    private userData: any;

    private listLikeCommentId : number[] = [];
    private listLikePostId : number[] = [];

    private listLikeCommentIdObs$ : BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private listLikePostIdObs$ : BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    constructor(
        private userService: UserService,
        private socketService: SocketIoService
    ) {
        this.setUserData();
        if (this.userData != null) {
            this.getListOfLikePostId();
            this.getListOfLikeCommentId();
        }
    }

    // Get User from Database
    public getUserFromDB(userId : string): Observable<User> {
        return this.userService.getUserById(userId);
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    public createUser(user: any): Observable<any> {
        this.userData = new User(
            user.uid,
            user.displayName,
            user.email,
            user.emailVerified,
            user.photoURL
        );

        this.getListOfLikePostId();
        this.getListOfLikeCommentId();

        return this.userService.create(this.userData)
    }

    public setUserData() {
        this.userData = this.getCurrentUser();
    }


    // Return Current User
    public getCurrentUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }

    // SET USER

    public setPhotoUrl(url: string) {
        const data = {
            userId: this.userData.userId,
            userName: this.userData.userName,
            photoUrl: url
        }
        this.userService.setPhotoUrl(data)
            .pipe(take(1))
            .subscribe((data: any) => {
                this.userData.photoUrl = url;
                localStorage.setItem('user', JSON.stringify(this.userData));
                this.socketService.setUser(data);
            });
    }

    //Remove User
    public removeUser(): Observable<any> {
        return this.userService.delete(this.userData.userId)
    }

    /**
     * COMMENT
     */

    // Return List Of Like CommentId
    public getListOfLikeCommentId() {
        this.userService.getlikeComment(this.userData.userId)
            .pipe(take(1))
            .subscribe( data => {
                this.listLikeCommentId = [];
                data.forEach((data : any) => {
                    this.listLikeCommentId.push(data.commentId);
                });

                this.listLikeCommentIdObs$.next(this.listLikeCommentId);
            });
    }


    public getObsListOfLikeComment():Observable<any> {
        return this.listLikeCommentIdObs$;
    }
    
    // Like Or Dislike Comment
    public likeComment(comment: Comment) {
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
                    this.listLikeCommentIdObs$.next(this.listLikeCommentId);
                    this.socketService.setComment(comment);
                })
        }
        else {
            this.userService.likeComment(data)
                .pipe(take(1))
                .subscribe( data => {
                    comment.countLikeComment ++;
                    this.listLikeCommentId.push(comment.commentId);
                    this.listLikeCommentIdObs$.next(this.listLikeCommentId);
                    this.socketService.setComment(comment);
                })
        }
    }

    /**
     * POST
     */
        
    // Return List Of Like PostId
    public getListOfLikePostId() {
        this.userService.getlikePost(this.userData.userId)
            .pipe(take(1))
            .subscribe( data => {
                this.listLikePostId = [];
                data.forEach((data : any) => {
                    this.listLikePostId.push(data.postId);
                });

                this.listLikePostIdObs$.next(this.listLikePostId);
            });
    }

    public getObsListOfLikePost():Observable<any> {
        return this.listLikePostIdObs$;
    }

    // Like Or Dislike Post
    public likePost(post: Post) {
        var data = {
            userId : this.userData.userId,
            postId : post.postId
        }

        if (this.listLikePostId.includes(post.postId)) {
            this.userService.dislikePost(data)
                .pipe(take(1))
                .subscribe( data => {
                    post.countLike --;
                    this.listLikePostId = this.listLikePostId.filter((item:number) => item !== post.postId);
                    this.listLikePostIdObs$.next(this.listLikePostId);
                    this.socketService.setPost(post);
                })
        }
        else {
            this.userService.likePost(data)
                .pipe(take(1))
                .subscribe( data => {
                    post.countLike ++;
                    this.listLikePostId.push(post.postId);
                    this.listLikePostIdObs$.next(this.listLikePostId);
                    this.socketService.setPost(post);
                })
        }
    }

}