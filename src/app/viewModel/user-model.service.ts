import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take} from 'rxjs';
import {SocketIoService} from '../service/socket-io.service';
import {UserService} from '../service/user.service';
import {LocalModel} from "../model/local.model";
// @ts-ignore
import {Post} from '../model/post.model';
// @ts-ignore
import {User} from '../model/user.model';
import {StorageModelService} from "./storage-model.service";


@Injectable({
  providedIn: 'root',
})
export class UserModelService {

  private userData!: User;
  private listReactPostId: number[] = [];
  private listReactPostIdObs$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(
    private userService: UserService,
    private socketService: SocketIoService,
    private storageModelService: StorageModelService,
  ) {
    this.initUserData();
  }

  /**
   * Init user Data
   */
  initUserData() {
    this.setUserData();
    if (this.userData != null) {
      this.initListOfReactPostId();
    }
  }

  /**
   * If user is identify
   */
  public canAccess(): boolean {
    return this.userData.userId != "0";
  }

  /**
   * Get User from Database
   * @param userId
   */
  public getUserFromDB(userId: string): Observable<User> {
    return this.userService.getUserById(userId);
  }

  /**
   * Create user
   * @param user
   */
  public createUser(user: User): Observable<any> {
    this.userData = user;

    this.initListOfReactPostId();

    return this.userService.createUser(this.userData)
  }

  /**
   * When user is Verified
   * @param user
   */
  public setUserIsVerified(userId: string): Observable<any> {

    return this.userService.setUserIsVerified({userId: userId});
  }

  /**
   * init userData
   */
  public setUserData() {
    this.userData = this.getCurrentUser();
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(LocalModel.USER)!);
  }

  // SET USER

  public setNbrOfPostUser(nbrOfPost: number) {
    this.userData.nbrOfPost = nbrOfPost;
    localStorage.setItem(LocalModel.USER, JSON.stringify(this.userData));
  }

  /**
   * Set picture of User
   * @param pictureUrl
   */
  public setPhotoUrl(pictureUrl: string) {

    this.storageModelService.uploadUserPictureAndGetUrl(this.userData.userId, pictureUrl).then(url => {
      const data = {
        userId: this.userData.userId,
        userName: this.userData.userName,
        photoUrl: url
      }
      this.userService.setPhotoUrl(data)
        .pipe(take(1))
        .subscribe((data: any) => {
          this.userData.photoUrl = url;
          localStorage.setItem(LocalModel.USER, JSON.stringify(this.userData));
          this.socketService.setUser(data);
        });
    })
  }

  /**
   * Set User Name
   * @param user
   */
  public setUserName(user: User) {
    this.userService.setUserName(user)
      .pipe(take(1))
      .subscribe(() => {
        localStorage.setItem(LocalModel.USER, JSON.stringify(user));
        this.socketService.setUser(user);
      });
  }

  /**
   * Remove User
   */
  public removeUser(): Observable<any> {
    return this.userService.deleteUser(this.userData.userId)
  }

  /**
   * POST
   */


  /**
   * Init list of React Post ID
   */
  public initListOfReactPostId() {
    this.userService.getReactPosts(this.userData.userId)
      .pipe(take(1))
      .subscribe(data => {
        this.listReactPostId = [];
        data.forEach((data: any) => {
          this.listReactPostId.push(data.postId);
        });

        this.listReactPostIdObs$.next(this.listReactPostId);
      });
  }

  /**
   * return list of react post Id
   */
  public getObsListOfReactPost(): BehaviorSubject<any> {
    return this.listReactPostIdObs$;
  }

  /**
   * React to post
   * @param post
   */
  public reactPost(post: Post) {
    let data = {
      userId: this.userData.userId,
      postId: post.postId,
      reaction: "testReaction"
    }

    if (this.listReactPostId.includes(post.postId)) {
      this.userService.unReactPost(data)
        .pipe(take(1))
        .subscribe(data => {
          post.countReact--;
          this.listReactPostId = this.listReactPostId.filter((item: number) => item !== post.postId);
          this.listReactPostIdObs$.next(this.listReactPostId);
          this.socketService.setPost(post);
        })
    } else {
      this.userService.addReactPost(data)
        .pipe(take(1))
        .subscribe(data => {
          post.countReact++;
          this.listReactPostId.push(post.postId);
          this.listReactPostIdObs$.next(this.listReactPostId);
          this.socketService.setPost(post);
        })
    }
  }

}
