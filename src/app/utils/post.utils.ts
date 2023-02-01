import { Post } from "../model/post.model";

// Creer User depuis FirebaseUser
export class PostUtils {
    static SetPost(refPost: Post, newData: any) {
        refPost.pictureUrl = newData.pictureUrl
        refPost.countReact = newData.countReact
        refPost.userId = newData.userId
        refPost.userName = newData.userName
        refPost.photoUrl = newData.photoUrl
    }

    static SetUser(post: Post, user : any) {
        post.userId = user.userId;
        post.userName = user.userName;
        post.photoUrl = user.photoUrl;
    }
}
