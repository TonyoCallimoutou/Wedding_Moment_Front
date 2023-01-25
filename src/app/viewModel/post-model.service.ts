import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { EventService } from '../service/event.service';
import { PostService } from '../service/post.service';
import { SocketIoService } from '../service/socket-io.service';
import { PostUtils } from '../utils/post.utils';
import { StorageModelService } from './storage-model.service';
import { UserModelService } from './user-model.service';


@Injectable({
    providedIn: 'root',
  })
export class PostModelService {

    private userData: User;

    private eventId:number;

    private listOfPost: Post[] = [];
    private listOfPostObs$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);


    constructor(
        private userModelService: UserModelService,
        public postService: PostService,
        private socketService: SocketIoService,
        private eventService: EventService,
        private storageModelService: StorageModelService,
    ) {
        this.eventId = this.eventService.getEventId();
        this.userData = this.userModelService.getCurrentUser();

        this.initList();

        this.initListeningFromSocket();
    }

    private initList() {
        this.postService.getAllPost(this.eventId)
            .pipe(take(1))
            .subscribe((data:any) => {
                this.listOfPost = data;
                this.listOfPostObs$.next(data);
            });
    }

    private initListeningFromSocket() {

        this.socketService.socket.on('listeningAddPost', (post: any) => {
            this.listOfPost.push(post);
            this.listOfPostObs$.next(this.listOfPost);
        });

        this.socketService.socket.on('ListeningRemovePost', (post: any) => {
            this.listOfPost = this.listOfPost.filter(item => item.postId !== post.postId);
            this.listOfPostObs$.next(this.listOfPost);
        });

        this.socketService.socket.on('ListeningSetPost', (post: any) => {
            this.listOfPost.forEach((item, i) => {
                if (item.postId == post.postId) {
                    PostUtils.SetPost(this.listOfPost[i], post);
                }
            });
            this.listOfPostObs$.next(this.listOfPost);
        });

        this.socketService.socket.on('ListeningSetUser', (user: any) => {
            this.listOfPost.forEach((item, i) => {
                if (item.userId == user.userId) {
                    PostUtils.SetUser(this.listOfPost[i], user)

                }
            });
            this.listOfPostObs$.next(this.listOfPost);
        });
    }

    // Create Post
    public createPost(data: any) {

        const pictureUrl = data;

        const post = {
            pictureUrl: "",
            eventId: this.eventId,
            countLike: 0,
            userId: this.userData.userId,
            userName: this.userData.userName,
            photoUrl: this.userData.photoUrl
        }


        this.postService.createPost(post)
            .pipe(take(1))
            .subscribe( data => {
                const postId = data.postId;
                this.storageModelService.UploadPictureAndGetUrl(postId, pictureUrl).then(url => {
                    this.postService.setPictureOfPost({
                        postId: postId,
                        pictureUrl: url,
                    })
                    .pipe(take(1))
                    .subscribe(() => {
                        data.pictureUrl = url;
                        this.socketService.addPost(data);
                    })
                })
            })
    }

    // Get All Post
    public getAll() {
        return this.listOfPostObs$;
    }

    // Remove Post
    public removePost(post: Post) {
        if (post.userId == this.userData.userId) {
            this.storageModelService.deletePictureFromStorage(post.pictureUrl);
            this.postService.deletePost(post.postId!)
                .pipe(take(1))
                .subscribe( data => {
                    this.socketService.removePost(post);
                })
        }
    }
}
