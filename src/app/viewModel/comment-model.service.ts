import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Comment } from '../model/comment.model';
import { Picture } from '../model/picture.model';
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

    private pictureId : any;

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
    }

    // Create Comment
    createComment(picture: Picture, comment: string) {
        this.pictureId = picture.pictureId;
        const data = {
            pictureId: this.pictureId,
            userId: this.userData.userId,
            comment: comment,         
            countLikeComment: 0,
            userName: this.userData.userName,
            photoUrl: this.userData.photoUrl
        }
        this.commentService.create(data)
            .pipe(take(1))
            .subscribe( data => {
                picture.countComment ++;
                this.socketService.addComment(picture, data)
        })
    }

    // Get Comment by picture ID
    getCommentsByPictureId(pictureId: number) {
        this.pictureId = pictureId;
        this.commentService.getCommentsByPictureId(pictureId)   
            .pipe(take(1))
            .subscribe(list => {
                this.listOfComment = list;
                this.listOfCommentObs$.next(list);
            })
        return this.listOfCommentObs$;
    }

    
    // Remove Comment
    removeComment(picture: Picture, comment: Comment) {
        this.pictureId = this.pictureId;
        if (comment.userId == this.userData.userId) {
            this.commentService.delete(comment.commentId!)
                .pipe(take(1))
                .subscribe( data => {
                    picture.countComment --;
                    this.socketService.removeComment(picture, comment)
                })
        }
    }
}