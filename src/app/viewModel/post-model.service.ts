import {Injectable} from '@angular/core';
import {BehaviorSubject, take} from 'rxjs';
import {EventService} from '../service/event.service';
import {PostService} from '../service/post.service';
import {SocketIoService} from '../service/socket-io.service';
import {PostUtils} from '../utils/post.utils';
import {StorageModelService} from './storage-model.service';
import {UserModelService} from './user-model.service';
import {LoaderService} from "../shared/service/loader.service";
import {CookieHelper} from "../shared/service/cookie.helper";
import {LocalModel} from "../model/local.model";
import {User} from "../model/user.model";
import {Report} from "../model/report.model";
import {Post} from "../model/post.model";


@Injectable({
  providedIn: 'root',
})
export class PostModelService {

  private userData: User;

  private eventId: number;

  private listOfPost: Post[] = [];
  private listOfPostObs$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private listOfPostOfflineObs$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);


  constructor(
    private eventService: EventService,
    private userModelService: UserModelService,
    public postService: PostService,
    private socketService: SocketIoService,
    private storageModelService: StorageModelService,
    private loaderService: LoaderService,
  ) {

    this.eventId = this.eventService.getEventId();
    this.userData = this.userModelService.getCurrentUser();
    this.listOfPostOfflineObs$.next(CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : []);

    if (this.userData) {

      this.initListeningFromSocket();
    }
  }

  public initPostModelService() {
    this.eventId = this.eventService.getEventId();
    this.userData = this.userModelService.getCurrentUser();

    if (this.userData) {

      this.initList();

      this.initListeningFromSocket();
    }
  }

  // Create Post
  public createPost(picture: any, ratio: number) {

    const post : Post = {
      postId: 0,
      pictureUrl: "",
      eventId: this.eventId,
      countReact: 0,
      userId: this.userData.userId,
      userName: this.userData.userName,
      photoUrl: this.userData.photoUrl,
      pictureRatio: ratio,
      publicationDate: new Date(),
      isDownloading: false
    }

    this.loaderService.setLoader(true);

    this.postService.createPost(post)
      .pipe(take(1))
      .subscribe(data => {
        post.postId = data.postId;

        post.pictureUrl = picture;
        let posts : Post[] = CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : [];
        posts.push(post);
        CookieHelper.set(LocalModel.POST_OFFLINE, JSON.stringify(posts));
        this.listOfPostOfflineObs$.next(posts);

        this.storageModelService.uploadPictureAndGetUrl(this.userData.userId, post.postId, picture).then(url => {
          this.postService.setPictureOfPost({
            userId: data.userId,
            postId: post.postId,
            pictureUrl: url,
          })
            .pipe(take(1))
            .subscribe(() => {
              this.loaderService.setLoader(false);
              data.pictureUrl = url;

              let posts: Post[] = CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : [];
              posts = posts.filter(item => item.postId !== post.postId);
              CookieHelper.set(LocalModel.POST_OFFLINE, JSON.stringify(posts));
              this.listOfPostOfflineObs$.next(posts);

              this.socketService.addPost(data);
            })
        }).catch((error) => {
          this.loaderService.setLoader(false);
        });
      })
  }

  // Get All Post
  public getAll(): BehaviorSubject<Post[]> {
    return this.listOfPostObs$;
  }

  public getAllOffline(): BehaviorSubject<Post[]> {
    return this.listOfPostOfflineObs$;
  }

  // Remove Post
  public removePost(post: Post) {
    let postsOffline : Post[] = CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : [];
    let postsFilter = postsOffline.filter(item => item.postId === post.postId);
    if (postsFilter.length > 0) {
      let postsFinal = postsOffline.filter(item => item.postId !== post.postId);
      CookieHelper.set(LocalModel.POST_OFFLINE, JSON.stringify(postsFinal));
      this.listOfPostOfflineObs$.next(postsFinal);
    }
    else if (post.userId == this.userData.userId) {
      this.storageModelService.deletePictureFromStorage(post.pictureUrl).then(() => {
        this.postService.deletePost(post)
          .pipe(take(1))
          .subscribe(data => {
            this.socketService.removePost(post);
          })
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  /**
   * Update post with firebase
   * @param post
   */
  updatePostWithFirebase(post: Post | null = null): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let posts : Post[] = CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : [];
      let postsFilter = post ? posts.filter(item => item.postId === post.postId) : posts;
      for (let post of postsFilter) {
        if(navigator.onLine) {
          this.storageModelService.uploadPictureAndGetUrl(this.userData.userId, post.postId, post.pictureUrl).then(url => {
            this.postService.setPictureOfPost({
              userId: post.userId,
              postId: post.postId,
              pictureUrl: url,
            })
              .pipe(take(1))
              .subscribe(() => {

                let posts: Post[] = CookieHelper.get(LocalModel.POST_OFFLINE) ? JSON.parse(<string>CookieHelper.get(LocalModel.POST_OFFLINE)) : [];
                posts = posts.filter(item => item.postId !== post.postId);
                CookieHelper.set(LocalModel.POST_OFFLINE, JSON.stringify(posts));
                this.listOfPostOfflineObs$.next(posts);

                post.pictureUrl = url;
                this.socketService.addPost(post);

                resolve(true);
              })
          }).catch((error) => {
            reject(error);
          });
        }
        else {
          reject(new Error("No internet connection"));
        }
      }
      if (postsFilter.length === 0) {
        reject(new Error("No post to update"));
      }
    });

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

  reportedPost(report: Report, post: Post): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      report.userId = this.userData.userId;
      this.postService.reportedPost(report)
        .pipe(take(1))
        .subscribe(() => {
          this.socketService.removePost(post);
          resolve(true);
        });
    });
  }

  private initList() {
    if (!(this.userData.userId === '0' || !this.userData.emailVerified)) {
      this.postService.getTenPost(this.eventId, {})
        .pipe(take(1))
        .subscribe((data: any) => {
          this.listOfPost = data;
          this.listOfPostObs$.next(data);
        });
    }
  }

  getMorePost(dateLastPost : Date): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.postService.getTenPost(this.eventId, {dateLastPost: dateLastPost})
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data.length !== 10) {
            resolve(false);
          }
          else {
            resolve(true);
          }

          this.listOfPost.push(...data);
          this.listOfPostObs$.next(this.listOfPost);
        });
    });
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

  reinitAllObservable() {
   this.listOfPostObs$ = new BehaviorSubject<Post[]>([]);
  }
}
