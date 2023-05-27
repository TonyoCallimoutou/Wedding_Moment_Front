import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
import {EventService} from '../service/event.service';
import {PostService} from '../service/post.service';
import {SocketIoService} from '../service/socket-io.service';
import {PostUtils} from '../utils/post.utils';
import {StorageModelService} from './storage-model.service';
import {UserModelService} from './user-model.service';
// @ts-ignore
import {Post} from '../model/post.model';
// @ts-ignore
import {User} from '../model/user.model';


@Injectable({
  providedIn: 'root',
})
export class PostModelService {

  private userData: User;

  private eventId: number;

  private listOfPost: Post[] = [];
  private listOfPostObs$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);


  constructor(
    private eventService: EventService,
    private userModelService: UserModelService,
    public postService: PostService,
    private socketService: SocketIoService,
    private storageModelService: StorageModelService,
  ) {

    /**
     * this.initPostModelService
     */
    this.eventId = this.eventService.getEventId();
    this.userData = this.userModelService.getCurrentUser();

    this.initList();

    this.initListeningFromSocket();
  }

  public initPostModelService() {
    this.eventId = this.eventService.getEventId();
    this.userData = this.userModelService.getCurrentUser();

    this.initList();

    this.initListeningFromSocket();
  }

  // Create Post
  public createPost(picture: any, ratio: number) {

    const pictureUrl = picture;

    const post : Post = {
      pictureUrl: "",
      eventId: this.eventId,
      countLike: 0,
      userId: this.userData.userId,
      userName: this.userData.userName,
      photoUrl: this.userData.photoUrl,
      pictureRatio: ratio
    }

    this.postService.createPost(post)
      .pipe(take(1))
      .subscribe(data => {
        const postId = data.postId;
        this.storageModelService.uploadPictureAndGetUrl(this.userData.userId, postId, pictureUrl).then(url => {
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
  public getAll(): BehaviorSubject<Post[]> {
    return this.listOfPostObs$;
  }

  // Remove Post
  public removePost(post: Post) {
    if (post.userId == this.userData.userId) {
      this.storageModelService.deletePictureFromStorage(post.pictureUrl);
      this.postService.deletePost(post.postId!)
        .pipe(take(1))
        .subscribe(data => {
          this.socketService.removePost(post);
        })
    }
  }

  /**
   * USER
   */


  getObsListOfReactPost(): BehaviorSubject<any[]> {
    return this.userModelService.getObsListOfReactPost();
  }

  reactPost(post: Post) {
    this.userModelService.reactPost(post);
  }

  private initList() {
    if (!(this.userData.userId === '0' || !this.userData.emailVerified)) {
      this.postService.getAllPost(this.eventId)
        .pipe(take(1))
        .subscribe((data: any) => {
          this.listOfPost = data;
          this.listOfPostObs$.next(data);
        });
    }
  }

  private initListeningFromSocket() {

    this.socketService.socket.on('listeningAddPost', (post: Post) => {
      if (!this.listOfPost.includes(post)) {
        this.listOfPost.splice(0,0,post);
        this.listOfPostObs$.next(this.listOfPost);
      }
    });

    this.socketService.socket.on('listeningRemovePost', (post: Post) => {
      this.listOfPost = this.listOfPost.filter(item => item.postId !== post.postId);
      this.listOfPostObs$.next(this.listOfPost);
    });

    this.socketService.socket.on('listeningSetPost', (post: Post) => {
      this.listOfPost.forEach((item, i) => {
        if (item.postId == post.postId) {
          PostUtils.SetPost(this.listOfPost[i], post);
        }
      });
      this.listOfPostObs$.next(this.listOfPost);
    });

    this.socketService.socket.on('listeningSetUser', (user: User) => {
      this.listOfPost.forEach((item, i) => {
        if (item.userId == user.userId) {
          PostUtils.SetUser(this.listOfPost[i], user)
        }
      });
      this.listOfPostObs$.next(this.listOfPost);
    });
  }
}
