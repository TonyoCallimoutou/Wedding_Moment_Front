import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Post } from '../model/post.model';
import { User } from '../model/user.model';
import { PostService } from '../service/post.service';
import { SocketIoService } from '../service/socket-io.service';
import { PostUtils } from '../utils/post.utils';
import { UserModelService } from './user-model.service';


@Injectable({
    providedIn: 'root',
  })
export class PostModelService {

    userData: User;

    private listOfPost: Post[] = [];
    private listOfPostObs$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);


    constructor(
        private userModelService: UserModelService,
        public postService: PostService,
        private socketService: SocketIoService,
    ) {
        this.userData = this.userModelService.getCurrentUser();

        this.initList();

        this.initListeningFromSocket();
    }
    
    initList() {
        this.postService.getAll()
            .pipe(take(1))
            .subscribe((data:any) => {
                this.listOfPost = data;
                this.listOfPostObs$.next(data);
            });
    }

    initListeningFromSocket() {

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
    createPost(data: any) {
        const post = {   
            pictureUrl: data.pictureUrl,
            categorieId: 1,
            countLike: 0,
            countComment: 0,
            userId: this.userData.userId,
            userName: this.userData.userName,
            photoUrl: this.userData.photoUrl
        }
        this.postService.create(post)
            .pipe(take(1))
            .subscribe( data => {
                this.socketService.addPost(data);
            })
    }

    // Get All Post
    getAll() {
        return this.listOfPostObs$;
    }

    // Remove Post
    removePost(post: Post) {
        if (post.userId == this.userData.userId) {
            this.postService.delete(post.postId!)
                .pipe(take(1))
                .subscribe( data => {
                    this.socketService.removePost(post);
                })
        }
    }
}