
// Creer User depuis FirebaseUser
import {Post} from "../model/post.model";

export class PostUtils {
  static SetPost(refPost: Post, newData: any) {
    refPost.pictureUrl = newData.pictureUrl
    refPost.countReact = newData.countReact
    refPost.userId = newData.userId
    refPost.userName = newData.userName
    refPost.photoUrl = newData.photoUrl
    refPost.publicationDate = newData.publicationDate
  }

  static SetUser(post: Post, user: any) {
    post.userId = user.userId;
    post.userName = user.userName;
    post.photoUrl = user.photoUrl;
  }
}
