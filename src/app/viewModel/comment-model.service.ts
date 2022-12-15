import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Comment } from '../model/comment.model';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { CommentService } from '../service/comment.service';
import { SocketIoService } from '../service/socket-io.service';
import { CommentUtils } from '../utils/comment.utils';
import { UserModelService } from './user-model.service';


@Injectable({
    providedIn: 'root',
  })
export class CommentModelService {

    userData: User;

    private postId : any;

    private listOfComment : Comment[] = [];
    private listOfCommentObs$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    constructor(
        private userModelService: UserModelService,
        public commentService: CommentService,
        public socketService: SocketIoService
    ) {
        this.userData = this.userModelService.getCurrentUser();

        this.initListeningFromSocket();
    }

    initListeningFromSocket() {

        this.socketService.socket.on('listeningAddComment', (comment: any) => {
            this.listOfComment.push(comment);
            this.listOfCommentObs$.next(this.listOfComment);
        });

        this.socketService.socket.on('ListeningRemoveComment', (comment: any) => {
            this.listOfComment = this.listOfComment.filter(item => item.commentId !== comment.commentId);
            this.listOfCommentObs$.next(this.listOfComment);
        });

        this.socketService.socket.on('ListeningSetComment', (comment: any) => {

            this.listOfComment.forEach((item, i) => { 
                if (item.commentId == comment.commentId) {
                    CommentUtils.SetComment(this.listOfComment[i], comment); 
                }
            });
            
            this.listOfCommentObs$.next(this.listOfComment);
        });

        this.socketService.socket.on('ListeningSetUser', (user: any) => {
            this.listOfComment.forEach((item, i) => { 
                if (item.userId == user.userId) {
                    CommentUtils.SetUser(this.listOfComment[i], user)
                    
                }
            });
            this.listOfCommentObs$.next(this.listOfComment);
        });
    }

    // Create Comment
    createComment(post: Post, comment: string) {
        this.postId = post.postId;
        const data = {
            postId: this.postId,
            userId: this.userData.userId,
            comment: comment,         
            countLikeComment: 0,
            userName: this.userData.userName,
            photoUrl: this.userData.photoUrl
        }
        this.commentService.create(data)
            .pipe(take(1))
            .subscribe( data => {
                post.countComment ++;
                this.socketService.addComment(post, data)
        })
    }

    // Get Comment by post ID
    getCommentsByPostId(postId: number) {
        this.postId = postId;
        this.commentService.getCommentsByPostId(postId)   
            .pipe(take(1))
            .subscribe(list => {
                this.listOfComment = list;
                this.listOfCommentObs$.next(list);
            })
        return this.listOfCommentObs$;
    }

    
    // Remove Comment
    removeComment(post: Post, comment: Comment) {
        this.postId = post.postId;
        if (comment.userId == this.userData.userId) {

            const data = {
                commentId: comment.commentId,
                postId: post.postId
            }

            this.commentService.delete(data)
                .pipe(take(1))
                .subscribe( data => {
                    post.countComment --;
                    this.socketService.removeComment(post, comment)
                })
        }
    }
}