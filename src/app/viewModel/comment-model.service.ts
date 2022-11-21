import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../model/comment.model';
import { User } from '../model/user.model';
import { CommentService } from '../service/comment.service';
import { SocketIoService } from '../service/socket-io.service';
import { UserModelService } from './user-model.service';


@Injectable({
    providedIn: 'root',
  })
export class CommentModelService {

    userData: User;

    private pictureId : any;

    private listOfCommentObs$: Subject<Comment[]> = new Subject<Comment[]>;

    constructor(
        private userModelService: UserModelService,
        public commentService: CommentService,
        public socketService: SocketIoService
    ) {
        this.userData = this.userModelService.getCurrentUser();

        this.socketService.socket.on('ListComments', (data: any) => {
            if (data === this.pictureId) {
                this.commentService.getCommentsByPictureId(this.pictureId).subscribe((data:any) => {
                    this.listOfCommentObs$.next(data);
                })
            }
          });
    }


    // Create Comment
    createComment(pictureId: number, comment: string) {
        this.pictureId = pictureId;
        const data = {
            pictureId: pictureId,
            userId: this.userData.userId,
            comment: comment
        }
        this.commentService.create(data)
        .subscribe( data => {
            this.socketService.refreshListComment(this.pictureId)
        })
    }

    // Get Comment by picture ID
    getCommentsByPictureId(pictureId: number) {
        this.pictureId = pictureId;
        this.commentService.getCommentsByPictureId(pictureId).subscribe(list => {
            this.listOfCommentObs$.next(list);
        })
        return this.listOfCommentObs$;
    }

    
    // Remove Comment
    removeComment(comment: Comment) {
        this.pictureId = this.pictureId;
        if (comment.userId == this.userData.userId) {
            this.commentService.delete(comment.commentId!)
            .subscribe( data => {
                this.socketService.refreshListComment(this.pictureId)
            })
        }
    }
}